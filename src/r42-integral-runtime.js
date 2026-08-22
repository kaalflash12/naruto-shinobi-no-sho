(function integralRuntime(global){
  'use strict';
  const BUILD='SNS-R42-INTEGRAL-20260822';
  const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const text=v=>String(v??'').trim();
  const now=()=>new Date().toISOString();

  class TargetValidation {
    static validate(target, context={}) {
      const requiresTarget=context.requiresTarget!==false;
      if(!requiresTarget)return {ok:true,target:null};
      if(target==null||target===''||(typeof target==='object'&&Object.keys(target).length===0))return {ok:false,error:'TARGET_REQUIRED'};
      const id=typeof target==='object'?(target.id??target.canonicalId??target.playerId??target.npcId):target;
      if(!text(id))return {ok:false,error:'TARGET_ID_REQUIRED'};
      if(context.actorId&&String(context.actorId)===String(id)&&context.allowSelf!==true)return {ok:false,error:'TARGET_SELF_FORBIDDEN'};
      if(Array.isArray(context.allowedTargetIds)&&!context.allowedTargetIds.map(String).includes(String(id)))return {ok:false,error:'TARGET_OUT_OF_CONTEXT'};
      return {ok:true,target,id:String(id)};
    }
  }

  class CombatEvent {
    constructor(type,payload={}){this.type=type;this.at=now();Object.assign(this,payload);}
    static fromResult(result={}){
      const events=[];
      const target=result.target??result.targetId??result.defender??null;
      if(result.attack||result.roll||result.total!=null)events.push(new CombatEvent('attack-resolved',{target,attack:clone(result.attack??result.roll??result.total)}));
      if(Number(result.damage??result.dano??0)!==0)events.push(new CombatEvent('damage-applied',{target,damage:Number(result.damage??result.dano??0)}));
      const conditions=result.conditions??result.condicoes??result.condições??[];
      for(const condition of Array.isArray(conditions)?conditions:[])events.push(new CombatEvent('condition-applied',{target,condition:clone(condition)}));
      if(result.result||result.outcome||result.success!=null)events.push(new CombatEvent('combat-outcome',{target,outcome:result.result??result.outcome??(result.success?'success':'failure')}));
      return events;
    }
  }

  class VisualStateEngine {
    static STATES=['IDLE','MOVE','DASH','PREPARE','HAND_SEALS','ATTACK','CAST','BLOCK','DODGE','HIT','KNOCKBACK','DOWN','KO','TRANSFORM','RECOVER'];
    static OVERLAYS=['BURNING','POISON','LIGHTNING','CHAKRA_AURA','DOJUTSU','GENJUTSU','BLEEDING'];
    static fromCombatResult(result={}){
      const states=[];
      if(result.technique||result.jutsu)states.push('CAST'); else states.push('ATTACK');
      if(Number(result.damage??result.dano??0)>0)states.push('HIT');
      if(result.knockback)states.push('KNOCKBACK');
      const raw=(result.conditions??[]).map(x=>String(typeof x==='object'?(x.id??x.name??''):x).toUpperCase());
      const overlays=this.OVERLAYS.filter(x=>raw.some(y=>y.includes(x)));
      return {states:[...new Set(states)],overlays};
    }
  }

  class AnimationRegistry {
    constructor(){this.entries=new Map();}
    register(id,definition){if(!text(id))throw new Error('ANIMATION_ID_REQUIRED');this.entries.set(String(id),clone(definition||{}));return this.get(id);}
    get(id){return clone(this.entries.get(String(id))||null);}
    resolve(technique={}){
      const explicit=this.get(technique.animationId??technique.animation);
      if(explicit)return explicit;
      const blob=JSON.stringify(technique).toLowerCase();
      if(/raiton|lightning|chidori|raikiri/.test(blob))return this.get('raiton_melee')||{prepare:'lightning_charge',movement:'dash_forward',impact:'lightning_hit',targetReaction:'knockback_medium'};
      if(/katon|fire/.test(blob))return {prepare:'hand_seals',movement:'cast',impact:'fire_hit',targetReaction:'burning'};
      return {prepare:'prepare',movement:'attack',impact:'hit',targetReaction:'hit'};
    }
  }

  class CombatPresentationEngine {
    constructor(animationRegistry=new AnimationRegistry()){this.animations=animationRegistry;}
    present(result={},context={}){
      const targetCheck=TargetValidation.validate(context.target??result.target??result.targetId,{...context,requiresTarget:context.requiresTarget!==false});
      if(!targetCheck.ok)return {ok:false,error:targetCheck.error,events:[]};
      const events=CombatEvent.fromResult({...result,target:targetCheck.target??targetCheck.id});
      const visual=VisualStateEngine.fromCombatResult(result);
      const animation=this.animations.resolve(result.technique??result.jutsu??result);
      try{global.dispatchEvent(new CustomEvent('sns:combat-events',{detail:{result:clone(result),events:clone(events),visual,animation}}));}catch{}
      return {ok:true,target:targetCheck.target??targetCheck.id,result:clone(result),events,visual,animation};
    }
  }

  class CharacterAppearanceSystem {
    static DEFAULT={body:null,face:null,hair:null,eyes:null,clothes:null,vest:null,headband:null,weapon:null,accessories:[],aura:null,transformations:[],damageState:null};
    static normalize(appearance={}){
      const a={...clone(this.DEFAULT),...(clone(appearance)||{})};
      a.accessories=Array.isArray(a.accessories)?a.accessories:[];
      a.transformations=Array.isArray(a.transformations)?a.transformations:[];
      return a;
    }
    static applyEquipment(appearance={},equipment={}){
      const a=this.normalize(appearance);
      const e=equipment||{};
      if(e.weapon||e.arma)a.weapon=e.weapon??e.arma;
      if(e.clothes||e.roupa)a.clothes=e.clothes??e.roupa;
      if(e.vest||e.colete)a.vest=e.vest??e.colete;
      if(e.headband||e.bandana)a.headband=e.headband??e.bandana;
      if(Array.isArray(e.accessories??e.acessorios))a.accessories=clone(e.accessories??e.acessorios);
      return a;
    }
    static applyDojutsu(appearance={},dojutsu={}){
      const a=this.normalize(appearance); if(dojutsu?.eyes||dojutsu?.visual)a.eyes=dojutsu.eyes??dojutsu.visual;
      if(dojutsu?.aura)a.aura=dojutsu.aura; return a;
    }
    static applyTransformation(appearance={},transformation={}){
      const a=this.normalize(appearance); const id=text(transformation.id??transformation.canonicalId??transformation.name);
      if(id&&!a.transformations.includes(id))a.transformations.push(id);
      if(transformation.aura)a.aura=transformation.aura;
      if(transformation.eyes)a.eyes=transformation.eyes;
      if(transformation.clothes)a.clothes=transformation.clothes;
      return a;
    }
    static persist(state,appearance){
      if(!state||typeof state!=='object')throw new Error('STATE_REQUIRED');
      state.appearance=this.normalize(appearance);
      try{global.r41ScheduleCloudSave?.('appearance');}catch{}
      return clone(state.appearance);
    }
  }

  class CanonicalNpcState {
    static normalize(npc={}){
      const canonicalId=text(npc.canonicalId??npc.id??npc.name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
      if(!canonicalId)throw new Error('NPC_CANONICAL_ID_REQUIRED');
      return {...clone(npc),canonicalId,identity:clone(npc.identity||{}),appearance:clone(npc.appearance||{}),location:clone(npc.location||{}),schedule:clone(npc.schedule||npc.agenda||{}),relationships:clone(npc.relationships||{}),services:clone(npc.services||{}),training:clone(npc.training||{}),missions:Array.isArray(npc.missions)?clone(npc.missions):[],worldState:{available:npc.worldState?.available!==false,injured:!!npc.worldState?.injured,onMission:!!npc.worldState?.onMission,lastWorldTick:npc.worldState?.lastWorldTick||null,...clone(npc.worldState||{})}};
    }
    static applyWorldTick(npc,world={}){
      const n=this.normalize(npc); n.worldState.lastWorldTick=world.time??world.now??now();
      if(world.npcAvailability&&Object.prototype.hasOwnProperty.call(world.npcAvailability,n.canonicalId))n.worldState.available=!!world.npcAvailability[n.canonicalId];
      return n;
    }
  }

  class MissionPreconditionRegistry {
    constructor(){this.rules=new Map();}
    register(id,rule){if(!text(id)||typeof rule!=='function')throw new Error('MISSION_PRECONDITION_INVALID');this.rules.set(String(id),rule);return this;}
    evaluate(mission={},state={}){
      const reasons=[]; const p=mission.preconditions??mission.precondition??mission.requirements??{};
      if(p.minLevel!=null&&Number(state.character?.level??state.level??0)<Number(p.minLevel))reasons.push('MIN_LEVEL');
      if(Array.isArray(p.flags))for(const f of p.flags)if(!state.world?.flags?.[f]&&!state.flags?.[f])reasons.push(`FLAG:${f}`);
      if(p.relationship){const value=Number(state.relationships?.[p.relationship.id]??0);if(value<Number(p.relationship.min??0))reasons.push(`RELATIONSHIP:${p.relationship.id}`);}
      const custom=this.rules.get(String(mission.id??mission.missionId??'')); if(custom&&custom(state,mission)!==true)reasons.push('CUSTOM_RULE');
      return {ok:reasons.length===0,reasons};
    }
  }

  class CharacterVariant { constructor(v={}){Object.assign(this,{id:null,appearancePreset:null,unlockCondition:null,techniqueLoadout:[],visualState:null},clone(v));} }
  class AppearancePreset { constructor(v={}){this.appearance=CharacterAppearanceSystem.normalize(v.appearance??v);} }
  class UnlockCondition { constructor(v={}){Object.assign(this,{minLevel:1,flags:[],requirements:[]},clone(v));} }
  class TechniqueLoadout { constructor(v=[]){this.techniques=Array.isArray(v)?clone(v):clone(v.techniques||[]);} }

  class SceneDirector {
    static route(scene={}){
      const mode=text(scene.mode??scene.type??'dialogue').toLowerCase();
      const allowed=['dialogue','exploration','test','training','minigame','combat'];
      return {scene:text(scene.scene??scene.id??'scene'),mode:allowed.includes(mode)?mode:'dialogue',participants:Array.isArray(scene.participants)?clone(scene.participants):[],environment:scene.environment??null,confirmedFacts:Array.isArray(scene.confirmedFacts)?clone(scene.confirmedFacts):[]};
    }
  }

  const animations=new AnimationRegistry();
  animations.register('raiton_melee',{prepare:'lightning_charge',movement:'dash_forward',impact:'lightning_hit',targetReaction:'knockback_medium'});
  const combatPresentation=new CombatPresentationEngine(animations);
  const missionPreconditions=new MissionPreconditionRegistry();

  global.SNSIntegralRuntime={BUILD,TargetValidation,CombatEvent,CombatPresentationEngine,VisualStateEngine,AnimationRegistry,CharacterAppearanceSystem,CanonicalNpcState,MissionPreconditionRegistry,CharacterVariant,AppearancePreset,UnlockCondition,TechniqueLoadout,SceneDirector,animations,combatPresentation,missionPreconditions};
  global.SNS_TARGET_VALIDATION=(target,context)=>TargetValidation.validate(target,context);
  global.SNS_PRESENT_COMBAT_RESULT=(result,context)=>combatPresentation.present(result,context);
  global.SNS_CHARACTER_APPEARANCE=CharacterAppearanceSystem;
  global.SNS_CANONICAL_NPC_STATE=CanonicalNpcState;
  global.SNS_MISSION_PRECONDITIONS=missionPreconditions;
})(window);
