# FUNÇÕES E MÉTODOS

Todas as funções/métodos detectados em fonte não documental. Cada entrada informa se pertence ao runtime do jogo ou ao tooling.

Gerado em: `2026-08-20T20:43:49.002Z`

## FUNC-00001 — `accountToken`

- **Fonte:** `app.js:27`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00002 — `apiHeaders`

- **Fonte:** `app.js:28`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `json=true,extra={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00003 — `$`

- **Fonte:** `app.js:71`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `sel, root=document`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00004 — `$$`

- **Fonte:** `app.js:72`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `sel, root=document`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00005 — `defaultState`

- **Fonte:** `app.js:97`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `newId`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00006 — `loadState`

- **Fonte:** `app.js:115`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `defaultState`, `recalc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00007 — `r34TrimState`

- **Fonte:** `app.js:135`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00008 — `r34SaveNow`

- **Fonte:** `app.js:142`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=true`
- **Chamadas internas detectadas:** `r34TrimState`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00009 — `saveState`

- **Fonte:** `app.js:149`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=false`
- **Chamadas internas detectadas:** `r34SaveNow`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00010 — `esc`

- **Fonte:** `app.js:157`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v=''`
- **Chamadas internas detectadas:** `clamp`, `rand`, `rollTerion2d10`, `rollLeon2d10`, `fmt`, `pct`, `today`, `newId`, `sourceName`, `xpNeeded`, `ncFor`, `graduationFor`, `originById`, `get`, `hijutsuById`, `variantById`, `updateVariantSelect`, `aptitudeById`, `itemById`, `jutsuById`, `missionById`, `aptitudeEffects`, `recalc`, `applyBonusToAttributes`, `createCharacter`, `toast`, `defaultState`, `saveState`, `render`, `gainXp`, `skillTotal`, `characterCanLearn`, `test`, `learnJutsu`, `buyAptitude`, `buyItem`, `useItem`, `battleLog`, `rest`, `daily`, `missionAvailable`, `startMission`, `resolveMissionChoice`, `startBattle`, `finishMission`, `enemyFor`, `weaponDamage`, `conditionPenalty`, `useBattleJutsu`, `enemyTurn`, `advanceBattleTurn`, `elementAdvantage`, `finishBattle`, `basicAttack`, `defendBattle`, `setDefense`, `normalizeAIResult`, `r361MissionScript`, `r361NarratorOptions`, `aiFallback`, `aiGameContext`, `r27CurrentLocationId`, `r25NpcRuntime`, `v83ClockLabel`, `v83EnsureState`, `v75Norm`, `checkAIStatus`, `fetch`, `json`, `updateAIStatusUI`, `mergeWorldUpdates`, `currentAIDirector`, `readAIDirectorFromForm`, `callAI`, `apiHeaders`, `narrateMissionStage`, `aiCustom`, `aiGenerateMission`, `normKey`, `normalize`, `leonRating`, `performAICheck`, `r25Duo`, `applyAIEffects`, `renderChrome`, `saveCampaignNow`, `leonSave`, `cloudSave`, `cloudLoad`, `exportSave`, `importSave`, `modal`, `closeModal`, `bars`, `renderCreate`, `renderHome`, `renderCharacter`, `renderOrigins`, `renderAptitudes`, `jutsuCard`, `renderTechniques`, `renderMissions`, `renderActiveMission`, `renderCombat`, `leonPrivatePanel`, `renderInventory`, `renderAI`, `renderEncyclopedia`, `renderConfig`, `deepClone`, `coreAttrKeys`, `socialAttrKeys`, `professionById`, `powerById`, `villageArt`, `itemPrice`, `originBonusObject`, `bonusHuman`, `sourceShort`, `writeCreationDraft`, `clearCreationDraft`, `newCreationDraft`, `getCreationDraft`, `creationAttrSpent`, `creationSocialSpent`, `creationSkillSpent`, `creationPowerSpent`, `creationPowerAvailable`, `creationCombatMoved`, `initialSkillBase`, `creationSkillTotal`, `creationSkillAvailable`, `characterSkillPurchaseAllowed`, `creationCombatTotal`, `creationAptitudeAvailable`, `validateCreationStep`, `goCreationStep`, `selectCreationOrigin`, `changeCreationAttr`, `changeCreationCombat`, `normalizeCombatBaseDraft`, `changeCreationSkill`, `toggleCreationAptitude`, `changeCreationPower`, `toggleExtraAptitude`, `addCreationItem`, `resizeImageFile`, `resolve`, `readSlotIndex`, `writeSlotIndex`, `updateSlotSummary`, `loadSlot`, `hydrateState`, `deleteSlot`, `loadState`, `r25CoreDefaults`, `r25LegacyFromCoreValues`, `renderCreationProgress`, `renderSlots`, `startSheetEdit`, `cancelSheetEdit`, `saveSheetEdit`, `officialOriginGrant`, `officialHijutsuGrant`, `ensureTravel`, `gridStyle`, `pctPos`, `mapCellButtons`, `selectedWorldVillage`, `worldSteps`, `worldRouteExists`, `missionDestination`, `travelMissionRows`, `mapLog`, `renderVillage`, `moveMapCell`, `selectWorld`, `travelWorld`, `leonUnlock`, `leonLoad`, `cloudLoadById`, `ensureOnlineState`, `onlineCharacterSummary`, `onlinePost`, `createOnlineRoom`, `refreshOnlineRoom`, `joinOnlineRoom`, `onlineHeartbeat`, `warn`, `sendOnlineMessage`, `leaveOnlineRoom`, `renderOnline`, `renderAIEnhanced`, `itemVisual`, `itemGlyph`, `equipmentReferenceGallery`, `attrIcon`, `allItems`, `shopItemAllowed`, `itemRarity`, `v7ItemArt`, `itemCategory`, `itemDescription`, `ensureV7State`, `add`, `inventoryCompartments`, `rankIndexName`, `salePrice`, `itemCardV7`, `hardTechniqueAccess`, `renderShop`, `buyItemV7`, `sellItemV7`, `trainingProgress`, `renderTraining`, `doTraining`, `weightedDrop`, `rollLoot`, `enemyTemplateFor`, `makeTerrain`, `gridDistance`, `terrainAt`, `tacticalMove`, `playerAttackRange`, `moveEnemyToward`, `techniqueRangeV7`, `renderTacticalBoard`, `routeMinigame`, `resolveMissionRoute`, `npcPortrait`, `npcInteract`, `healHospital`, `villageLocation`, `ensureV74State`, `ensureLeonKuraiV74`, `refreshDailyEventsV74`, `dayKeyV74`, `seededV74`, `eventCompletedV74`, `activeEventsV74`, `eventByIdV74`, `eventRewardTextV74`, `completeEventV74`, `eventTestV74`, `eventPanelV74`, `buyQtyV74`, `sellQtyV74`, `kuraiCardV74`, `leonDojoV74`, `rinnePath`, `ensureV75State`, `v75CostText`, `v75JutsuArt`, `v75LeonTechArt`, `rinneUnlocked`, `rinneRequirementStatus`, `unlockRinnePathV75`, `v75NormalActions`, `v75LeonActions`, `v75Actions`, `v75Action`, `v75ResolvedCost`, `v75CanPay`, `v75Deduct`, `v75PromptAction`, `useRpgActionV75`, `clone`, `v75HasEffects`, `rpgRollV75`, `v75EffectsPanel`, `v75ConditionRow`, `v75ResourceControls`, `adjustRpgResourceV75`, `v75SheetPanel`, `v75ActionCard`, `renderAIV75`, `privateAccessAllowed`, `v8EnsureCreationVisuals`, `v8VisualSummary`, `v8ChoiceButtons`, `v8ProgressHtml`, `v8Asset`, `v8CreatorAsset`, `v8TechAsset`, `v8ItemAsset`, `v8ActionAsset`, `v8EventAsset`, `v8XpTableRows`, `v8TechniqueFallback`, `v8ItemFallback`, `v8LeonTerrain`, `v8StartLeonBattle`, `v8LeonSkillFor`, `v8LeonDefenseCD`, `v8LeonLog`, `v8LeonFinish`, `v8LeonNextTurn`, `v8LeonEnemyTurn`, `v8LeonBasicAttack`, `v8LeonDefend`, `v8LeonPromptCombat`, `v8LeonUseAction`, `v8LeonBoard`, `v8RenderLeonCombat`, `v81IsLeon`, `v81LeonCaps`, `v81CapGroup`, `v81PaletteGroup`, `v81CapArt`, `v81ActionId`, `v81SyncLeonPrivate`, `matchTab`, `count`, `v81CapCard`, `v81CodexNav`, `v81KusenroCodex`, `v81SuirinCodex`, `v81KuraiCodex`, `v81Progression`, `v81CombatTabDefs`, `v81CombatActions`, `v81CombatActionCard`, `v82DamageGrade`, `v82DamageGradeLabel`, `v82OfficialBaseDamage`, `v82AttackMode`, `v82ResolvePlayerAttack`, `v82LeonOutcome`, `v84Visual`, `v84NormKey`, `v82OriginArt`, `v82JutsuArt`, `v82Learnable`, `v82OwnedNormal`, `v82NormalTechCard`, `v82LeonTechCard`, `v82EnsureTraining`, `v82TrainingRoll`, `v82PracticeSkill`, `v82PracticeTech`, `skillName`, `v82Progression`, `v82CurrentNPCs`, `v82ActionList`, `v82NarrationCard`, `v82RenderLeonCodex`, `v82RulesCodex`, `v82NormalBoard`, `v82CleanUI`, `v821Clone`, `v821ActiveStatus`, `v821ApplyLeonCanonical`, `v821LeonLocalState`, `v821LoadLeon`, `v821ResetLeon`, `v821LoadImage`, `v821DrawCrop`, `v821DrawAvatar`, `v821ComposeAvatarDataUrl`, `v83Copy`, `v83Hash`, `v83ClockAbsolute`, `v83DefaultMasterState`, `v83AdvanceMinutes`, `v83WorldTick`, `v83Commit`, `v83SavePoint`, `v83BeginScene`, `v83EndScene`, `v83CapCategory`, `v83CapArt`, `v83CapForAction`, `v83IsPassive`, `v83UsageLimit`, `v83ResourceReasons`, `v83Decision`, `v83CatalogActionDecision`, `v83ActionDecision`, `v83Deactivate`, `v83AfterTechnique`, `v83TechStatusFilter`, `v83TechniqueButton`, `v83TechniqueCard`, `v83SkillValue`, `v83EligibleMentorIds`, `v83AcquireDecision`, `v83ProjectFor`, `v83StartProject`, `v83TrainingMentor`, `v83ProjectSession`, `v83FinalizeProject`, `v83PracticeOwned`, `v83PracticeSkillAdvance`, `v83VisibleMentors`, `v83MentorOptions`, `v83MissionExercise`, `v83CatalogCard`, `v83MissionRecord`, `v83MissionAccess`, `v83CreateMissionBranch`, `v83ResolveMissionEvent`, `v84TrainerCanUnlock`, `v83CompleteMissionTraining`, `v83CombatRoundTick`, `v84MigrateLeon`, `v84Clone`, `v84EnsureMaster`, `v84NpcArt`, `v84SyncBattleTokens`, `v84BattlefieldMarkup`, `renderBattlefieldV84`, `v84SceneActors`, `v84IntegrateVisualDraft`, `v84SceneStageMarkup`, `renderNpcCodexV84`, `v84KnowledgeMeta`, `r39SemanticKnowledgeFallback`, `v84KnowledgeImage`, `renderKnowledgeV84`, `v84OpenKnowledge`, `v84OpenNpc`, `v84Api`, `v84DecorateScreen`, `v841CreatorLayer`, `v841ReferenceData`, `v841RecordName`, `v841RecordDesc`, `renderVisualAtlasV841`, `v841CardArt`, `v841InsertArt`, `v841DecorateScreen`, `v841DurationMinutes`, `accountApi`, `accountLocalKey`, `accountArt`, `cacheAccount`, `setAccountState`, `loadAccountSlots`, `loadAccountSlot`, `loadLeonAccount`, `accountToken`, `v841SyncAccountSave`, `startAccountCreation`, `submitAuth`, `restoreAuth`, `logoutAccount`, `deleteAccountSlot`, `importLegacySlots`, `renderAccessV841`, `r31Asset`, `renderAccountSlotsV841`, `decorateAccountChrome`, `r25Commit`, `r25CommonCD`, `r25NarrativeFromChoice`, `r25Rest`, `r25TrainerAvailable`, `r25MentorSession`, `r25NpcRoutineSlot`, `r25CoreSpent`, `r25CoreFromLegacy`, `r25SyncLegacyFromCore`, `r25ChangeCoreAttr`, `r25CoreResourcePreview`, `r25CoreCreatorHTML`, `r25CoreReviewHTML`, `r25ReplaceWizardMiddle`, `r25ApplyCoreResources`, `r27AbsMinute`, `r27Copy`, `r27Ensure`, `r27TrainingRecent`, `r27TrainingGate`, `r27TrainingBlock`, `r27RecordTraining`, `r27RestSafety`, `r27ApplyAIResultEffects`, `num`, `r27EnemyArtForOpponent`, `r27BattleDims`, `r27NormalizeOpponent`, `r27SetBattleOpponents`, `r27SyncBattleTarget`, `r27ActiveEnemies`, `r27SelectBattleTarget`, `r27CellBlocked`, `r27PathStep`, `r27EnemyIntent`, `r27TargetStrip`, `r27TrainingData`, `r27TechniqueTrack`, `r27TechniqueForms`, `r27UpdateTechniqueForms`, `r27CommonSkillPractice`, `r27CommonTechniquePractice`, `r27DojoPractice`, `r27RestUnified`, `r27RenderRest`, `r27MaterialSnapshot`, `r27DiffObjects`, `r27VillageKey`, `r27VillageCenterLocation`, `r27SetCurrentLocation`, `r27NpcSameLocation`, `r27VillageLocationId`, `r27SocialEnsure`, `r27NpcRelation`, `r27RelationLabel`, `r27NpcByAnyId`, `r27RegisterRumor`, `r27SocialInteraction`, `r27FactionImpact`, `r27ApplySocialImpactFromAI`, `r27RenderRelationships`, `r36StoryArc`, `r36StoryChoices`, `r27StoryChapters`, `r27StoryEnsure`, `r27StoryComplete`, `r27StoryEnemySpecs`, `r27StoryStart`, `r27DuelEnsure`, `r27DuelAutoAI`, `r36StoryChance`, `r27StoryChoice`, `r27StoryBattleTick`, `r27RenderStory`, `r27DuelEra`, `r27DuelRoster`, `r27DuelSelect`, `r27DuelFighter`, `r27StartDuel`, `byId`, `r27DuelAlive`, `r27DuelCurrent`, `r27DuelTarget`, `r27DuelRoll`, `r27DuelCheckEnd`, `r27DuelAIRound`, `r27DuelAction`, `r27RenderDuel`, `r27ActionValidation`, `r27QuickCards`, `r27GMFormat`, `r27RuntimeValidation`, `r27InvocationEnsure`, `r27GrantInvocationContract`, `r27Summon`, `r27SenjutsuEnsure`, `r27SenjutsuGather`, `r27CampaignAudit`, `r27CanonEnsure`, `r27SystemDispatch`, `r27RenderSystems`, `r27ApplyLeonAuthority`, `r27WorldMission`, `r27MissionStageTitle`, `r27MissionScriptedNarrative`, `r27ArcNumber`, `r27CanonPreviousResolved`, `r27CanonPlayerLocation`, `r27CanonLocationMatch`, `r27CanonRoster`, `r27CanonPendingSync`, `r27ProcessCanonTriggers`, `r27CanonValidEvidence`, `r27ResolveCanonEvent`, `r27ApplyCanonEvidenceFromAI`, `r29Hash`, `r29Family`, `r29AssetFor`, `r29NormRank`, `r29Ensure`, `r29RankMax`, `r29CanonRank`, `r29SeedCanonMissions`, `r29Assignment`, `r29MissionKind`, `r29ActiveCanonEvent`, `r29AssignMission`, `r29SideCandidates`, `r29DirectorTick`, `r29MissionAccess`, `r29UpdatePromotionPending`, `r29PromotionRequirements`, `r29RankReview`, `r30Pick`, `r30Text`, `r30JutsuArt`, `r30ItemArt`, `r30SkillArt`, `r30AptArt`, `r30ResourceArt`, `r30CharacterArt`, `r30NpcArt`, `r30TitleArt`, `r30EffectArt`, `r30Ensure`, `r30UnlockTitle`, `r30RevealSecret`, `r30ResolveSecret`, `r30SecretDef`, `r30EvaluateSecrets`, `r30TitlesHtml`, `r31GeneratedItemPool`, `r31EnsureCatalogItems`, `r31Ensure`, `r31Clock`, `r31Commit`, `r31Norm`, `r31HasOwned`, `r31GradId`, `r31Metric`, `r31Category`, `r31MentorFor`, `r31SourceUnlocked`, `r31LineageRequirement`, `r31RequiredItemForTechnique`, `r31InventoryHas`, `r31EquipmentRequirement`, `r31RuntimePrerequisites`, `r31TechniqueAccess`, `r31RecordTechniqueUse`, `r31ExpireActiveTechniques`, `r31TechniqueDamageProfile`, `r31TechniqueStatusLabel`, `r31TechniqueMentorAvailable`, `r31ResolveTrainingOpportunity`, `r31OpportunityFromBranch`, `r31MissionBranches`, `r31SyncMissionBranches`, `r31ResolveMentorOpportunity`, `r31DiscoverMentorForOpportunity`, `r31ResolveOpportunity`, `r31MentorTechniqueCandidates`, `r31MentorSession`, `r31TechniqueArt`, `r31Semantic`, `r31UniqueAssets`, `r31PickVisualPool`, `r31VariantContext`, `r31ItemArt`, `r31NpcArt`, `r31EnemyArt`, `r31MissionArt`, `r31VendorArt`, `r31TechniqueCard`, `r31PartyDef`, `r31PartyHtml`, `r31PartyToggle`, `r31RandomBattle`, `r31PartyAction`, `r31BattlefieldArt`, `r31BoardHtml`, `r31AptitudeArt`, `r31SkillArt`, `r31ResourceArt`, `r31VisualCoverage`, `r31PlaceholderPolicy`, `r31StaticAcceptance`, `r31QaEnter`, `r31QaAcceptance`, `r31InstallVisualMaps`, `bind`, `r31DecorateUI`, `r32Clone`, `r32MissionRuntime`, `r32ActiveAssignment`, `r32PersistMissionRuntime`, `r32RestoreMissionRuntime`, `r32ActiveMission`, `r32MissionDependencyIds`, `r32MissionContinuityGate`, `r33Script`, `r33Bonus`, `r33CD`, `r33Chance`, `r33Outcome`, `r33ApplyEffects`, `r33EnsureRun`, `r33Stage`, `r33ChoiceMeta`, `r33EffectSummary`, `r33MissionHeader`, `r33ChoiceCard`, `r33RenderActiveMission`, `r33LocalOpponent`, `r33StartLocalCombat`, `r35MissionError`, `r34RecordClientError`, `r34SaveNow`, `r382ContentType`, `r382TrueMissions`, `r382Tasks`, `r382Events`, `r382Script`, `r382Mode`, `r382ModeLabel`, `r382CampaignForArc`, `r382ArcById`, `r382NarrativeState`, `r382RemoveLegacyCanonPseudoMissions`, `r382Words`, `r382ArcMissionScore`, `r382ArcMissionCandidate`, `r382RenderNarrativeHub`, `r382NarrateArc`, `done`, `r382MissionFreeAction`, `r41Clone`, `r41Slug`, `r41AbsMinute`, `r41Ensure`, `r41ActiveInjuries`, `r41PersistentRecoveryCap`, `r41Log`, `r41CloudFlush`, `r41ScheduleCloudSave`, `r41HospitalPlan`, `r41HospitalTreat`, `r41GameForText`, `r41RecordMinigame`, `r41OpenMinigame`, `r41BroadcastGameplay`, `finish`, `frame`, `nextTiming`, `nextTargets`, `nextSequence`, `nextReaction`, `nextOdd`, `nextMerge`, `nextWave`, `nextStealth`, `handler`, `next`, `r41ExactVisual`, `r41Appearance`, `r41SetVisualState`, `r41AvatarComposite`, `r41DoActivity`, `r41OnlineAction`, `r41OnlineRefresh`, `r41SendOnlineIntent`, `r41CombatSnapshot`, `r41CombatVisual`, `r41PresentDiff`
- **Rotas referidas:** `/api/status`, `/api/ai`, `/api/account/save`, `/api/cloud/load`, `/api/private/unlock`, `/api/private/leon/load`, `/api/private/leon/save`, `/api/online/create`, `/api/online/join`, `/api/online/heartbeat`, `/api/online/room`, `/api/online/messages`, `/api/online/message`, `/api/v84/world/event`, `/api/v84/world/savepoint`, `/api/v84/bootstrap`, `/api/account/slots`, `/api/account/load`, `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`, `/api/account/delete`, `/api/online/action`, `/api/online/state`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `v83-mentor-${v75Norm(project.id)}`, `v83-practice-tech`, `v83-practice-method`, `v83-practice-skill`, `r27-dojo-tech`, `ai-prompt`, `r27-system-output`, `r382-mission-free-action`, `modal-root`, `r41-online-intent`, `app`, `r41-seq-input`
- **Storage keys:** `sns-private-session-state`, `sns-r34-client-errors`
- **Env:** —
- **Ações UI literais:** `close-modal`, `create-character`, `daily`, `rest`, `attr-down`, `attr-up`, `skill-up`, `buy-aptitude`, `learn-jutsu`, `show-more-jutsu`, `start-mission`, `show-more-mission`, `abandon-mission`, `mission-choice`, `narrate-mission`, `start-battle`, `end-battle`, `basic-attack`, `defend`, `battle-item`, `set-defense`, `battle-jutsu`, `equip-weapon`, `equip-armor`, `use-item`, `buy-item`, `ai-choice`, `check-ai`, `cloud-save`, `ai-custom`, `ai-generate-mission`, `ai-check`, `apply-ai-effects`, `cloud-load`, `encyclopedia-tab`, `save`, `export`, `reset`, `create-avatar`, `create-origin`, `create-attr`, `create-social`, `create-combat`, `create-skill`, `create-aptitude`, `create-profession`, `create-item`, `create-prev`, `create-next`, `new-character`, `load-slot`, `delete-slot`, `cloud-load-code`, `private-login`, `save-sheet`, `cancel-sheet`, `edit-sheet`, `sheet-attr`, `sheet-skill`, `${kind}-move`, `map-mode`, `world-select`, `world-travel`, `map-hotspot`, `map-enter`, `online-create`, `online-join`, `online-refresh`, `online-leave`, `online-send`, `create-class`, `create-element`, `create-power`, `create-extra-aptitude`, `shop-buy`, `shop-sell`, `shop-vendor`, `shop-mode`, `shop-category`, `train`, `tactical-move`, `mission-route`, `hospital-heal`, `npc-talk`, `event-step`, `event-close`, `event-open`, `shop-qty`, `shop-buy-qty`, `shop-sell-qty`, `inventory-filter`, `leon-dojo`, `dojo-duel`, `rpg-confirm-cost`, `rpg-resource`, `rpg-roll`, `rpg-select`, `rpg-use`, `rpg-option`, `rpg-continue`, `rpg-tab`, `rinne-unlock`, `kurai-mode`, `creation-jump`, `v8-visual`, `v8-open-ai-train`, `v8-xp-table`, `v8-leon-tech-confirm`, `v8-leon-move`, `v8-start-leon`, `v8-leon-exit`, `v8-leon-basic`, `v8-leon-defend`, `v8-leon-dodge`, `v8-leon-focus`, `v8-leon-flee`, `v8-battle-ai`, `v8-leon-tech`, `v81-cap-open`, `v81-grim-filter`, `v81-codex-tab`, `v81-ai-progression`, `v81-refresh-ai`, `v81-combat-filter`, `v82-open-resource`, `v82-tech-tab`, `v82-train-tech`, `v82-use-outside`, `v82-practice-skill`, `v82-practice-tech`, `v82-npc-train`, `v82-start-elite`, `v82-train-tab`, `v82-npc-narrate`, `v82-select-action`, `v82-ai-tab`, `v82-codex`, `v82-basic-melee`, `v82-basic-ranged`, `v821-load-leon`, `v821-reset-leon`, `v83-use-tech`, `v83-cap-open`, `v83-tech-state`, `v83-tech-category`, `v83-mission-training`, `v83-practice-owned`, `v83-practice-skill`, `v83-project-session`, `v83-project-final`, `v83-start-dojo`, `v83-train-tab`, `v83-start-project`, `v83-codex-more`, `v83-codex-tab`, `v83-resolve-mission-event`, `v84-cell`, `v84-token`, `v84-map-tool`, `v84-grid-toggle`, `v84-field-preset`, `v84-stage-field`, `v84-open-npc`, `v84-npc-more`, `v84-kb-type`, `v84-open-kb`, `v84-kb-more`, `v84-character-preset`, `v841-atlas-type`, `v841-atlas-more`, `auth-mode`, `auth-submit`, `account-new`, `account-logout`, `account-load`, `account-delete`, `account-import-legacy`, `r25-rest`, `r25-mentor`, `r25-core-attr`, `r27-target-enemy`, `r27-dojo-practice`, `r27-rest`, `r27-social-talk`, `r27-story-abandon`, `r27-story-choice`, `r27-story-start`, `r27-duel-reset`, `r27-duel-active`, `r27-duel-target`, `r27-duel-action`, `r27-duel-select`, `r27-duel-ai`, `r27-duel-start`, `r27-duel-filter`, `r27-system-audit`, `r29-rank-review`, `account-load-leon`, `r31-train-technique`, `r31-opportunity`, `r31-mentor-session`, `r31-tech-state`, `r31-tech-category`, `r31-party-action`, `r31-party-toggle`, `r31-random-battle`, `${action}`, `r32-resume-mission`, `r382-board-tab`, `r382-narrate-arc`, `r382-select-arc`, `r382-mission-free-action`, `r41-hospital-treat`, `r41-activity`, `r41-online-intent`
- **Status:** `STATICALLY_TRACED`

## FUNC-00011 — `clamp`

- **Fonte:** `app.js:158`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,min,max`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00012 — `rand`

- **Fonte:** `app.js:159`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `min,max`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00013 — `rollTerion2d10`

- **Fonte:** `app.js:160`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n=2`
- **Chamadas internas detectadas:** `rand`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00014 — `rollLeon2d10`

- **Fonte:** `app.js:161`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `rand`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00015 — `fmt`

- **Fonte:** `app.js:162`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00016 — `pct`

- **Fonte:** `app.js:163`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v,max`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00017 — `today`

- **Fonte:** `app.js:164`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00018 — `newId`

- **Fonte:** `app.js:165`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00019 — `sourceName`

- **Fonte:** `app.js:166`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00020 — `xpNeeded`

- **Fonte:** `app.js:167`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `level`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00021 — `ncFor`

- **Fonte:** `app.js:168`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `level`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00022 — `graduationFor`

- **Fonte:** `app.js:169`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `level`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00023 — `originById`

- **Fonte:** `app.js:170`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00024 — `hijutsuById`

- **Fonte:** `app.js:171`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00025 — `variantById`

- **Fonte:** `app.js:172`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `hijutsuId,variantId`
- **Chamadas internas detectadas:** `hijutsuById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00026 — `updateVariantSelect`

- **Fonte:** `app.js:173`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `hijutsuById`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00027 — `aptitudeById`

- **Fonte:** `app.js:174`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00028 — `itemById`

- **Fonte:** `app.js:175`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00029 — `jutsuById`

- **Fonte:** `app.js:176`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00030 — `missionById`

- **Fonte:** `app.js:177`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00031 — `aptitudeEffects`

- **Fonte:** `app.js:179`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `aptitudeById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00032 — `recalc`

- **Fonte:** `app.js:190`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,refill=false`
- **Chamadas internas detectadas:** `clamp`, `ncFor`, `graduationFor`, `aptitudeEffects`, `originById`, `hijutsuById`, `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00033 — `applyBonusToAttributes`

- **Fonte:** `app.js:221`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `attrs,bonus`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00034 — `createCharacter`

- **Fonte:** `app.js:227`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `applyBonusToAttributes`, `originById`, `hijutsuById`, `defaultState`, `variantById`, `recalc`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00035 — `gainXp`

- **Fonte:** `app.js:244`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `amount`
- **Chamadas internas detectadas:** `xpNeeded`, `recalc`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00036 — `skillTotal`

- **Fonte:** `app.js:258`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `aptitudeEffects`, `originById`, `hijutsuById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00037 — `characterCanLearn`

- **Fonte:** `app.js:265`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `test`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00038 — `learnJutsu`

- **Fonte:** `app.js:283`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `jutsuById`, `characterCanLearn`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00039 — `buyAptitude`

- **Fonte:** `app.js:289`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `aptitudeById`, `toast`, `recalc`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00040 — `buyItem`

- **Fonte:** `app.js:296`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00041 — `useItem`

- **Fonte:** `app.js:303`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,inBattle=false`
- **Chamadas internas detectadas:** `itemById`, `aptitudeEffects`, `toast`, `battleLog`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00042 — `rest`

- **Fonte:** `app.js:318`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `aptitudeEffects`, `saveState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00043 — `daily`

- **Fonte:** `app.js:324`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `today`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00044 — `missionAvailable`

- **Fonte:** `app.js:330`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `graduationFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00045 — `startMission`

- **Fonte:** `app.js:336`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `missionById`, `missionAvailable`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00046 — `resolveMissionChoice`

- **Fonte:** `app.js:363`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `index`
- **Chamadas internas detectadas:** `missionById`, `startBattle`, `skillTotal`, `rollTerion2d10`, `rand`, `finishMission`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00047 — `finishMission`

- **Fonte:** `app.js:378`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `win,fromBattle=false`
- **Chamadas internas detectadas:** `missionById`, `clamp`, `gainXp`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00048 — `enemyFor`

- **Fonte:** `app.js:392`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,mission`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00049 — `startBattle`

- **Fonte:** `app.js:400`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id=null,mission=null`
- **Chamadas internas detectadas:** `toast`, `enemyFor`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00050 — `battleLog`

- **Fonte:** `app.js:408`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `text,type='info'`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00051 — `weaponDamage`

- **Fonte:** `app.js:409`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00052 — `conditionPenalty`

- **Fonte:** `app.js:410`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,kind`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00053 — `useBattleJutsu`

- **Fonte:** `app.js:412`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `jutsuById`, `toast`, `battleLog`, `enemyTurn`, `advanceBattleTurn`, `aptitudeEffects`, `conditionPenalty`, `rollTerion2d10`, `elementAdvantage`, `test`, `rand`, `finishBattle`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00054 — `elementAdvantage`

- **Fonte:** `app.js:436`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `attackElement,playerElement,enemyElement`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00055 — `basicAttack`

- **Fonte:** `app.js:441`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `conditionPenalty`, `rollTerion2d10`, `weaponDamage`, `aptitudeEffects`, `battleLog`, `finishBattle`, `enemyTurn`, `advanceBattleTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00056 — `defendBattle`

- **Fonte:** `app.js:451`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `battleLog`, `enemyTurn`, `advanceBattleTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00057 — `enemyTurn`

- **Fonte:** `app.js:455`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `battleLog`, `rollTerion2d10`, `conditionPenalty`, `rand`, `itemById`, `finishBattle`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00058 — `advanceBattleTurn`

- **Fonte:** `app.js:476`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00059 — `finishBattle`

- **Fonte:** `app.js:482`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `win`
- **Chamadas internas detectadas:** `gainXp`, `battleLog`, `toast`, `finishMission`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00060 — `setDefense`

- **Fonte:** `app.js:489`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00061 — `normalizeAIResult`

- **Fonte:** `app.js:491`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `raw`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00062 — `r361MissionScript`

- **Fonte:** `app.js:520`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00063 — `r361NarratorOptions`

- **Fonte:** `app.js:521`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action,mission,here,present=[]`
- **Chamadas internas detectadas:** `r361MissionScript`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00064 — `aiFallback`

- **Fonte:** `app.js:552`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `request`
- **Chamadas internas detectadas:** `aiGameContext`, `r27CurrentLocationId`, `missionById`, `test`, `r25NpcRuntime`, `normalizeAIResult`, `v83ClockLabel`, `v83EnsureState`, `v75Norm`, `r361NarratorOptions`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00065 — `checkAIStatus`

- **Fonte:** `app.js:563`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `fetch`, `json`, `updateAIStatusUI`, `render`
- **Rotas referidas:** `/api/status`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00066 — `updateAIStatusUI`

- **Fonte:** `app.js:570`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00067 — `mergeWorldUpdates`

- **Fonte:** `app.js:576`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00068 — `currentAIDirector`

- **Fonte:** `app.js:590`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00069 — `readAIDirectorFromForm`

- **Fonte:** `app.js:594`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `currentAIDirector`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00070 — `callAI`

- **Fonte:** `app.js:608`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `payload`
- **Chamadas internas detectadas:** `currentAIDirector`, `render`, `aiFallback`, `fetch`, `apiHeaders`, `json`, `normalizeAIResult`, `mergeWorldUpdates`, `toast`
- **Rotas referidas:** `/api/ai`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00071 — `aiGameContext`

- **Fonte:** `app.js:625`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `originById`, `hijutsuById`, `variantById`, `skillTotal`, `jutsuById`, `aptitudeById`, `itemById`, `missionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00072 — `narrateMissionStage`

- **Fonte:** `app.js:638`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `missionById`, `callAI`, `aiGameContext`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00073 — `aiCustom`

- **Fonte:** `app.js:644`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `readAIDirectorFromForm`, `callAI`, `aiGameContext`, `currentAIDirector`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00074 — `aiGenerateMission`

- **Fonte:** `app.js:652`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `graduationFor`, `readAIDirectorFromForm`, `callAI`, `aiGameContext`, `currentAIDirector`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00075 — `normKey`

- **Fonte:** `app.js:659`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00076 — `leonRating`

- **Fonte:** `app.js:660`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `test,c`
- **Chamadas internas detectadas:** `normKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00077 — `performAICheck`

- **Fonte:** `app.js:667`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `leonRating`, `rollLeon2d10`, `toast`, `callAI`, `aiGameContext`, `currentAIDirector`, `saveState`, `render`, `skillTotal`, `r25Duo`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00078 — `applyAIEffects`

- **Fonte:** `app.js:696`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `options={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00079 — `saveCampaignNow`

- **Fonte:** `app.js:727`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `saveState`, `leonSave`, `cloudSave`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00080 — `cloudSave`

- **Fonte:** `app.js:746`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=false`
- **Chamadas internas detectadas:** `leonSave`, `render`, `fetch`, `apiHeaders`, `json`, `toast`
- **Rotas referidas:** `/api/account/save`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00081 — `cloudLoad`

- **Fonte:** `app.js:754`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `fetch`, `json`, `defaultState`, `recalc`, `saveState`, `toast`
- **Rotas referidas:** `/api/cloud/load`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00082 — `exportSave`

- **Fonte:** `app.js:761`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `today`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00083 — `importSave`

- **Fonte:** `app.js:764`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `file`
- **Chamadas internas detectadas:** `defaultState`, `recalc`, `saveState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00084 — `toast`

- **Fonte:** `app.js:766`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `text,type='',duration=3000`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00085 — `modal`

- **Fonte:** `app.js:769`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `title,body,foot=''`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `close-modal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00086 — `closeModal`

- **Fonte:** `app.js:770`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00087 — `bars`

- **Fonte:** `app.js:772`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `pct`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00088 — `renderChrome`

- **Fonte:** `app.js:774`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `bars`, `originById`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00089 — `renderCreate`

- **Fonte:** `app.js:788`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `create-character`
- **Status:** `STATICALLY_TRACED`

## FUNC-00090 — `renderHome`

- **Fonte:** `app.js:794`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `xpNeeded`, `esc`, `originById`, `hijutsuById`, `variantById`, `today`, `bars`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `daily`, `rest`
- **Status:** `STATICALLY_TRACED`

## FUNC-00091 — `renderCharacter`

- **Fonte:** `app.js:800`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `skillTotal`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `rest`, `attr-down`, `attr-up`, `skill-up`
- **Status:** `STATICALLY_TRACED`

## FUNC-00092 — `renderOrigins`

- **Fonte:** `app.js:808`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `originById`, `hijutsuById`, `sourceName`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00093 — `renderAptitudes`

- **Fonte:** `app.js:813`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `buy-aptitude`
- **Status:** `STATICALLY_TRACED`

## FUNC-00094 — `jutsuCard`

- **Fonte:** `app.js:818`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `characterCanLearn`, `esc`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `learn-jutsu`
- **Status:** `STATICALLY_TRACED`

## FUNC-00095 — `renderTechniques`

- **Fonte:** `app.js:823`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `show-more-jutsu`
- **Status:** `STATICALLY_TRACED`

## FUNC-00096 — `renderMissions`

- **Fonte:** `app.js:830`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `missionAvailable`, `esc`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `start-mission`, `show-more-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00097 — `renderActiveMission`

- **Fonte:** `app.js:836`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `missionById`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `abandon-mission`, `mission-choice`, `narrate-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00098 — `renderCombat`

- **Fonte:** `app.js:840`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `leonPrivatePanel`, `esc`, `bars`, `pct`, `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `start-battle`, `end-battle`, `basic-attack`, `defend`, `battle-item`, `set-defense`, `battle-jutsu`
- **Status:** `STATICALLY_TRACED`

## FUNC-00099 — `renderInventory`

- **Fonte:** `app.js:846`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `itemById`, `esc`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `equip-weapon`, `equip-armor`, `use-item`, `buy-item`
- **Status:** `STATICALLY_TRACED`

## FUNC-00100 — `renderAI`

- **Fonte:** `app.js:850`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `normalizeAIResult`, `esc`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `ai-choice`, `check-ai`, `cloud-save`, `ai-custom`, `ai-generate-mission`, `ai-check`, `apply-ai-effects`, `cloud-load`
- **Status:** `STATICALLY_TRACED`

## FUNC-00101 — `renderEncyclopedia`

- **Fonte:** `app.js:887`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `encyclopedia-tab`
- **Status:** `STATICALLY_TRACED`

## FUNC-00102 — `renderConfig`

- **Fonte:** `app.js:895`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `save`, `export`, `cloud-save`, `cloud-load`, `reset`
- **Status:** `STATICALLY_TRACED`

## FUNC-00103 — `render`

- **Fonte:** `app.js:907`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `renderChrome`, `updateAIStatusUI`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00104 — `deepClone`

- **Fonte:** `app.js:914`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00105 — `coreAttrKeys`

- **Fonte:** `app.js:915`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00106 — `socialAttrKeys`

- **Fonte:** `app.js:916`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00107 — `professionById`

- **Fonte:** `app.js:917`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00108 — `powerById`

- **Fonte:** `app.js:918`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00109 — `villageArt`

- **Fonte:** `app.js:919`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00110 — `itemPrice`

- **Fonte:** `app.js:920`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `item,c=state.character`
- **Chamadas internas detectadas:** `professionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00111 — `originBonusObject`

- **Fonte:** `app.js:921`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `originId,hijutsuId,enabled=true`
- **Chamadas internas detectadas:** `originById`, `hijutsuById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00112 — `bonusHuman`

- **Fonte:** `app.js:926`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `bonus`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00113 — `sourceShort`

- **Fonte:** `app.js:931`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00114 — `writeCreationDraft`

- **Fonte:** `app.js:932`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00115 — `clearCreationDraft`

- **Fonte:** `app.js:933`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00116 — `newCreationDraft`

- **Fonte:** `app.js:934`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00117 — `getCreationDraft`

- **Fonte:** `app.js:935`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `newCreationDraft`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00118 — `creationAttrSpent`

- **Fonte:** `app.js:940`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** `coreAttrKeys`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00119 — `creationSocialSpent`

- **Fonte:** `app.js:941`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** `socialAttrKeys`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00120 — `creationSkillSpent`

- **Fonte:** `app.js:942`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00121 — `creationPowerSpent`

- **Fonte:** `app.js:943`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00122 — `creationPowerAvailable`

- **Fonte:** `app.js:944`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `p,d=getCreationDraft(`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00123 — `creationCombatMoved`

- **Fonte:** `app.js:945`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00124 — `initialSkillBase`

- **Fonte:** `app.js:946`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d,sk`
- **Chamadas internas detectadas:** `originBonusObject`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00125 — `creationSkillTotal`

- **Fonte:** `app.js:947`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d,sk`
- **Chamadas internas detectadas:** `initialSkillBase`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00126 — `creationSkillAvailable`

- **Fonte:** `app.js:948`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `sk,d=getCreationDraft(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00127 — `characterSkillPurchaseAllowed`

- **Fonte:** `app.js:949`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,c=state.character`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00128 — `creationCombatTotal`

- **Fonte:** `app.js:950`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d,id`
- **Chamadas internas detectadas:** `originBonusObject`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00129 — `creationAptitudeAvailable`

- **Fonte:** `app.js:951`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,d=getCreationDraft(`
- **Chamadas internas detectadas:** `creationCombatTotal`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00130 — `validateCreationStep`

- **Fonte:** `app.js:960`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `step=getCreationDraft(`
- **Chamadas internas detectadas:** `getCreationDraft`, `hijutsuById`, `creationAttrSpent`, `creationSocialSpent`, `creationCombatMoved`, `creationSkillSpent`, `creationAptitudeAvailable`, `creationPowerSpent`, `professionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00131 — `goCreationStep`

- **Fonte:** `app.js:973`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `validateCreationStep`, `toast`, `clamp`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00132 — `selectCreationOrigin`

- **Fonte:** `app.js:974`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,id`
- **Chamadas internas detectadas:** `getCreationDraft`, `toast`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00133 — `changeCreationAttr`

- **Fonte:** `app.js:975`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta,social=false`
- **Chamadas internas detectadas:** `getCreationDraft`, `creationSocialSpent`, `creationAttrSpent`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00134 — `changeCreationCombat`

- **Fonte:** `app.js:976`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `writeCreationDraft`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00135 — `normalizeCombatBaseDraft`

- **Fonte:** `app.js:977`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `getCreationDraft`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00136 — `changeCreationSkill`

- **Fonte:** `app.js:978`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `creationSkillSpent`, `creationSkillAvailable`, `toast`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00137 — `toggleCreationAptitude`

- **Fonte:** `app.js:979`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `getCreationDraft`, `toast`, `aptitudeById`, `creationAptitudeAvailable`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00138 — `changeCreationPower`

- **Fonte:** `app.js:980`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `powerById`, `creationPowerSpent`, `creationPowerAvailable`, `toast`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00139 — `toggleExtraAptitude`

- **Fonte:** `app.js:981`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `getCreationDraft`, `writeCreationDraft`, `render`, `creationPowerSpent`, `toast`, `aptitudeById`, `creationAptitudeAvailable`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00140 — `addCreationItem`

- **Fonte:** `app.js:982`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `itemById`, `toast`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00141 — `resizeImageFile`

- **Fonte:** `app.js:983`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `file`
- **Chamadas internas detectadas:** `resolve`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00142 — `readSlotIndex`

- **Fonte:** `app.js:985`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00143 — `writeSlotIndex`

- **Fonte:** `app.js:986`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `list`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00144 — `updateSlotSummary`

- **Fonte:** `app.js:987`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `readSlotIndex`, `writeSlotIndex`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00145 — `loadSlot`

- **Fonte:** `app.js:988`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `hydrateState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00146 — `deleteSlot`

- **Fonte:** `app.js:989`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `readSlotIndex`, `writeSlotIndex`, `defaultState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00147 — `hydrateState`

- **Fonte:** `app.js:990`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `parsed`
- **Chamadas internas detectadas:** `defaultState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00148 — `defaultState`

- **Fonte:** `app.js:991`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `newId`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00149 — `loadState`

- **Fonte:** `app.js:992`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `hydrateState`, `newId`, `readSlotIndex`, `writeSlotIndex`, `defaultState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00150 — `saveState`

- **Fonte:** `app.js:1000`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=false`
- **Chamadas internas detectadas:** `newId`, `updateSlotSummary`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** `sns-private-session-state`
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00151 — `recalc`

- **Fonte:** `app.js:1014`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,refill=false`
- **Chamadas internas detectadas:** `originBonusObject`, `coreAttrKeys`, `socialAttrKeys`, `clamp`, `ncFor`, `graduationFor`, `aptitudeEffects`, `itemById`, `professionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00152 — `skillTotal`

- **Fonte:** `app.js:1027`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,character=state.character`
- **Chamadas internas detectadas:** `aptitudeEffects`, `professionById`, `originById`, `hijutsuById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00153 — `buyItem`

- **Fonte:** `app.js:1028`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `toast`, `itemPrice`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00154 — `useItem`

- **Fonte:** `app.js:1029`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,inBattle=false`
- **Chamadas internas detectadas:** `itemById`, `professionById`, `aptitudeEffects`, `toast`, `battleLog`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00155 — `createCharacter`

- **Fonte:** `app.js:1031`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `getCreationDraft`, `validateCreationStep`, `writeCreationDraft`, `render`, `toast`, `newId`, `defaultState`, `r25CoreDefaults`, `r25LegacyFromCoreValues`, `professionById`, `itemById`, `recalc`, `saveState`, `clearCreationDraft`, `cloudSave`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00156 — `renderCreationProgress`

- **Fonte:** `app.js:1036`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00157 — `renderCreate`

- **Fonte:** `app.js:1037`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `getCreationDraft`, `esc`, `originById`, `hijutsuById`, `bonusHuman`, `sourceShort`, `originBonusObject`, `creationAttrSpent`, `coreAttrKeys`, `socialAttrKeys`, `creationSocialSpent`, `creationCombatMoved`, `creationCombatTotal`, `creationSkillSpent`, `initialSkillBase`, `creationSkillTotal`, `creationAptitudeAvailable`, `professionById`, `creationPowerSpent`, `validateCreationStep`, `renderCreationProgress`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `create-avatar`, `create-origin`, `create-attr`, `create-social`, `create-combat`, `create-skill`, `create-aptitude`, `create-profession`, `create-item`, `create-character`, `create-prev`, `create-next`
- **Status:** `STATICALLY_TRACED`

## FUNC-00158 — `renderSlots`

- **Fonte:** `app.js:1051`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `readSlotIndex`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `new-character`, `save`, `load-slot`, `delete-slot`, `cloud-load-code`, `private-login`
- **Status:** `STATICALLY_TRACED`

## FUNC-00159 — `startSheetEdit`

- **Fonte:** `app.js:1062`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `deepClone`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00160 — `cancelSheetEdit`

- **Fonte:** `app.js:1063`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00161 — `saveSheetEdit`

- **Fonte:** `app.js:1064`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `recalc`, `saveState`, `render`, `saveCampaignNow`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00162 — `renderCharacter`

- **Fonte:** `app.js:1065`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `leonPrivatePanel`, `recalc`, `originById`, `hijutsuById`, `professionById`, `originBonusObject`, `bonusHuman`, `esc`, `coreAttrKeys`, `officialOriginGrant`, `officialHijutsuGrant`, `powerById`, `skillTotal`, `characterSkillPurchaseAllowed`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `save`, `save-sheet`, `cancel-sheet`, `edit-sheet`, `sheet-attr`, `sheet-skill`
- **Status:** `STATICALLY_TRACED`

## FUNC-00163 — `ensureTravel`

- **Fonte:** `app.js:1081`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00164 — `gridStyle`

- **Fonte:** `app.js:1086`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cols,rows`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00165 — `pctPos`

- **Fonte:** `app.js:1087`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x,y,cols,rows`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00166 — `mapCellButtons`

- **Fonte:** `app.js:1088`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,cols,rows`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `${kind}-move`
- **Status:** `STATICALLY_TRACED`

## FUNC-00167 — `selectedWorldVillage`

- **Fonte:** `app.js:1089`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureTravel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00168 — `worldSteps`

- **Fonte:** `app.js:1090`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00169 — `worldRouteExists`

- **Fonte:** `app.js:1091`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00170 — `missionDestination`

- **Fonte:** `app.js:1092`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00171 — `travelMissionRows`

- **Fonte:** `app.js:1093`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `villageId`
- **Chamadas internas detectadas:** `missionDestination`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `start-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00172 — `mapLog`

- **Fonte:** `app.js:1094`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `msg`
- **Chamadas internas detectadas:** `ensureTravel`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00173 — `renderVillage`

- **Fonte:** `app.js:1095`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureTravel`, `villageArt`, `selectedWorldVillage`, `pctPos`, `worldRouteExists`, `worldSteps`, `esc`, `gridStyle`, `mapCellButtons`, `travelMissionRows`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `map-mode`, `world-select`, `world-travel`, `map-hotspot`, `map-enter`
- **Status:** `STATICALLY_TRACED`

## FUNC-00174 — `moveMapCell`

- **Fonte:** `app.js:1106`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,x,y`
- **Chamadas internas detectadas:** `ensureTravel`, `toast`, `mapLog`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00175 — `selectWorld`

- **Fonte:** `app.js:1107`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureTravel`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00176 — `travelWorld`

- **Fonte:** `app.js:1108`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureTravel`, `worldRouteExists`, `toast`, `mapLog`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00177 — `leonUnlock`

- **Fonte:** `app.js:1109`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `code=null`
- **Chamadas internas detectadas:** `toast`, `fetch`, `apiHeaders`, `json`, `leonLoad`
- **Rotas referidas:** `/api/private/unlock`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `private-login`
- **Status:** `STATICALLY_TRACED`

## FUNC-00178 — `leonLoad`

- **Fonte:** `app.js:1127`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `fetch`, `apiHeaders`, `json`, `hydrateState`, `render`, `toast`
- **Rotas referidas:** `/api/private/leon/load`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00179 — `leonSave`

- **Fonte:** `app.js:1128`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=false`
- **Chamadas internas detectadas:** `toast`, `fetch`, `apiHeaders`, `json`
- **Rotas referidas:** `/api/private/leon/save`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** `sns-private-session-state`
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00180 — `leonPrivatePanel`

- **Fonte:** `app.js:1129`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00181 — `cloudLoadById`

- **Fonte:** `app.js:1142`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `playerId`
- **Chamadas internas detectadas:** `toast`, `render`, `fetch`, `json`, `hydrateState`, `newId`, `saveState`
- **Rotas referidas:** `/api/cloud/load`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00182 — `cloudLoad`

- **Fonte:** `app.js:1143`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `cloudLoadById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00183 — `checkAIStatus`

- **Fonte:** `app.js:1145`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `fetch`, `json`, `updateAIStatusUI`, `render`
- **Rotas referidas:** `/api/status`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00184 — `updateAIStatusUI`

- **Fonte:** `app.js:1146`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00185 — `callAI`

- **Fonte:** `app.js:1147`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `payload`
- **Chamadas internas detectadas:** `currentAIDirector`, `render`, `aiFallback`, `fetch`, `apiHeaders`, `json`, `normalizeAIResult`, `mergeWorldUpdates`, `toast`
- **Rotas referidas:** `/api/ai`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00186 — `ensureOnlineState`

- **Fonte:** `app.js:1149`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00187 — `onlineCharacterSummary`

- **Fonte:** `app.js:1150`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00188 — `onlinePost`

- **Fonte:** `app.js:1151`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `path,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00189 — `createOnlineRoom`

- **Fonte:** `app.js:1152`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureOnlineState`, `render`, `cloudSave`, `onlinePost`, `onlineCharacterSummary`, `saveState`, `toast`, `refreshOnlineRoom`
- **Rotas referidas:** `/api/online/create`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00190 — `joinOnlineRoom`

- **Fonte:** `app.js:1153`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `ensureOnlineState`, `render`, `onlinePost`, `onlineCharacterSummary`, `saveState`, `cloudSave`, `refreshOnlineRoom`
- **Rotas referidas:** `/api/online/join`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00191 — `onlineHeartbeat`

- **Fonte:** `app.js:1154`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureOnlineState`, `onlinePost`, `onlineCharacterSummary`, `warn`
- **Rotas referidas:** `/api/online/heartbeat`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00192 — `refreshOnlineRoom`

- **Fonte:** `app.js:1155`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=false`
- **Chamadas internas detectadas:** `ensureOnlineState`, `toast`, `render`, `onlineHeartbeat`, `onlinePost`, `saveState`, `warn`
- **Rotas referidas:** `/api/online/room`, `/api/online/messages`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00193 — `sendOnlineMessage`

- **Fonte:** `app.js:1156`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureOnlineState`, `onlinePost`, `refreshOnlineRoom`, `toast`, `render`
- **Rotas referidas:** `/api/online/message`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00194 — `leaveOnlineRoom`

- **Fonte:** `app.js:1157`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureOnlineState`, `saveState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00195 — `renderOnline`

- **Fonte:** `app.js:1158`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `ensureOnlineState`, `esc`, `refreshOnlineRoom`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `online-create`, `online-join`, `online-refresh`, `online-leave`, `cloud-save`, `online-send`
- **Status:** `STATICALLY_TRACED`

## FUNC-00196 — `renderAIEnhanced`

- **Fonte:** `app.js:1167`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00197 — `renderConfig`

- **Fonte:** `app.js:1171`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `save`, `export`, `cloud-save`, `cloud-load`
- **Status:** `STATICALLY_TRACED`

## FUNC-00198 — `officialOriginGrant`

- **Fonte:** `app.js:1174`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `o`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00199 — `officialHijutsuGrant`

- **Fonte:** `app.js:1182`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `h`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00200 — `itemVisual`

- **Fonte:** `app.js:1187`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00201 — `itemGlyph`

- **Fonte:** `app.js:1188`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00202 — `equipmentReferenceGallery`

- **Fonte:** `app.js:1189`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `limit=11`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00203 — `attrIcon`

- **Fonte:** `app.js:1190`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `k`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00204 — `renderCreate`

- **Fonte:** `app.js:1192`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `getCreationDraft`, `esc`, `originById`, `hijutsuById`, `bonusHuman`, `officialHijutsuGrant`, `sourceShort`, `officialOriginGrant`, `creationAttrSpent`, `creationSocialSpent`, `originBonusObject`, `coreAttrKeys`, `attrIcon`, `socialAttrKeys`, `normalizeCombatBaseDraft`, `creationCombatTotal`, `creationSkillSpent`, `initialSkillBase`, `creationSkillTotal`, `creationSkillAvailable`, `creationAptitudeAvailable`, `creationPowerSpent`, `creationPowerAvailable`, `allItems`, `shopItemAllowed`, `itemRarity`, `v7ItemArt`, `itemCategory`, `fmt`, `itemDescription`, `equipmentReferenceGallery`, `professionById`, `powerById`, `aptitudeById`, `validateCreationStep`, `renderCreationProgress`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `create-avatar`, `create-origin`, `create-class`, `create-element`, `create-attr`, `create-social`, `create-combat`, `create-skill`, `create-aptitude`, `create-power`, `create-extra-aptitude`, `create-profession`, `create-item`, `create-character`, `create-prev`, `create-next`
- **Status:** `STATICALLY_TRACED`

## FUNC-00205 — `renderHome`

- **Fonte:** `app.js:1235`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `leonPrivatePanel`, `villageArt`, `originById`, `professionById`, `hijutsuById`, `officialHijutsuGrant`, `officialOriginGrant`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `save`
- **Status:** `STATICALLY_TRACED`

## FUNC-00206 — `renderOrigins`

- **Fonte:** `app.js:1245`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `sourceShort`, `officialOriginGrant`, `bonusHuman`, `officialHijutsuGrant`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00207 — `renderInventory`

- **Fonte:** `app.js:1250`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `professionById`, `fmt`, `esc`, `itemById`, `itemVisual`, `itemGlyph`, `itemPrice`, `equipmentReferenceGallery`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `equip-weapon`, `equip-armor`, `use-item`, `buy-item`
- **Status:** `STATICALLY_TRACED`

## FUNC-00208 — `ensureV7State`

- **Fonte:** `app.js:1261`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00209 — `allItems`

- **Fonte:** `app.js:1270`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `add`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00210 — `v7ItemArt`

- **Fonte:** `app.js:1271`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** `itemVisual`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00211 — `itemRarity`

- **Fonte:** `app.js:1272`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00212 — `itemCategory`

- **Fonte:** `app.js:1273`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00213 — `itemDescription`

- **Fonte:** `app.js:1274`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00214 — `inventoryCompartments`

- **Fonte:** `app.js:1275`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00215 — `rankIndexName`

- **Fonte:** `app.js:1276`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `name`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00216 — `shopItemAllowed`

- **Fonte:** `app.js:1277`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i,c=state.character`
- **Chamadas internas detectadas:** `rankIndexName`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00217 — `salePrice`

- **Fonte:** `app.js:1278`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i,c=state.character`
- **Chamadas internas detectadas:** `professionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00218 — `itemCardV7`

- **Fonte:** `app.js:1279`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i,q=0,mode='inventory'`
- **Chamadas internas detectadas:** `itemRarity`, `itemPrice`, `salePrice`, `shopItemAllowed`, `esc`, `v7ItemArt`, `itemCategory`, `itemDescription`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `equip-weapon`, `equip-armor`, `use-item`, `shop-buy`, `shop-sell`
- **Status:** `STATICALLY_TRACED`

## FUNC-00219 — `hardTechniqueAccess`

- **Fonte:** `app.js:1284`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j,c=state.character`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00220 — `renderTechniques`

- **Fonte:** `app.js:1295`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `leonPrivatePanel`, `hardTechniqueAccess`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `show-more-jutsu`
- **Status:** `STATICALLY_TRACED`

## FUNC-00221 — `renderInventory`

- **Fonte:** `app.js:1301`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `itemCategory`, `itemById`, `inventoryCompartments`, `fmt`, `esc`, `itemCardV7`, `v7ItemArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00222 — `renderShop`

- **Fonte:** `app.js:1306`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `allItems`, `itemCategory`, `shopItemAllowed`, `itemById`, `esc`, `fmt`, `itemCardV7`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `shop-vendor`, `shop-mode`, `shop-category`
- **Status:** `STATICALLY_TRACED`

## FUNC-00223 — `buyItemV7`

- **Fonte:** `app.js:1312`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `shopItemAllowed`, `toast`, `itemPrice`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00224 — `sellItemV7`

- **Fonte:** `app.js:1313`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `toast`, `salePrice`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00225 — `trainingProgress`

- **Fonte:** `app.js:1314`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `skill`
- **Chamadas internas detectadas:** `ensureV7State`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00226 — `renderTraining`

- **Fonte:** `app.js:1315`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `leonPrivatePanel`, `trainingProgress`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `train`
- **Status:** `STATICALLY_TRACED`

## FUNC-00227 — `doTraining`

- **Fonte:** `app.js:1319`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureV7State`, `toast`, `skillTotal`, `rollTerion2d10`, `trainingProgress`, `gainXp`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00228 — `weightedDrop`

- **Fonte:** `app.js:1320`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `table`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00229 — `rollLoot`

- **Fonte:** `app.js:1321`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `enemy,elite=false`
- **Chamadas internas detectadas:** `ensureV7State`, `weightedDrop`, `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00230 — `enemyTemplateFor`

- **Fonte:** `app.js:1322`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `rank,elite=false`
- **Chamadas internas detectadas:** `rand`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00231 — `enemyFor`

- **Fonte:** `app.js:1323`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,mission`
- **Chamadas internas detectadas:** `clamp`, `enemyTemplateFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00232 — `makeTerrain`

- **Fonte:** `app.js:1324`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00233 — `startBattle`

- **Fonte:** `app.js:1325`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id=null,mission=null`
- **Chamadas internas detectadas:** `toast`, `render`, `enemyFor`, `enemyTemplateFor`, `itemById`, `makeTerrain`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00234 — `gridDistance`

- **Fonte:** `app.js:1326`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00235 — `terrainAt`

- **Fonte:** `app.js:1327`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00236 — `tacticalMove`

- **Fonte:** `app.js:1328`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x,y`
- **Chamadas internas detectadas:** `gridDistance`, `toast`, `terrainAt`, `battleLog`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00237 — `playerAttackRange`

- **Fonte:** `app.js:1329`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `itemById`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00238 — `basicAttack`

- **Fonte:** `app.js:1330`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `gridDistance`, `playerAttackRange`, `toast`, `conditionPenalty`, `rollTerion2d10`, `terrainAt`, `weaponDamage`, `aptitudeEffects`, `battleLog`, `finishBattle`, `enemyTurn`, `advanceBattleTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00239 — `moveEnemyToward`

- **Fonte:** `app.js:1331`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,e`
- **Chamadas internas detectadas:** `gridDistance`, `clamp`, `battleLog`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00240 — `enemyTurn`

- **Fonte:** `app.js:1332`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `battleLog`, `gridDistance`, `clamp`, `moveEnemyToward`, `rollTerion2d10`, `terrainAt`, `conditionPenalty`, `rand`, `itemById`, `finishBattle`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00241 — `techniqueRangeV7`

- **Fonte:** `app.js:1333`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00242 — `useBattleJutsu`

- **Fonte:** `app.js:1334`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `jutsuById`, `toast`, `techniqueRangeV7`, `gridDistance`, `battleLog`, `enemyTurn`, `advanceBattleTurn`, `aptitudeEffects`, `conditionPenalty`, `rollTerion2d10`, `terrainAt`, `test`, `finishBattle`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00243 — `advanceBattleTurn`

- **Fonte:** `app.js:1335`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00244 — `finishBattle`

- **Fonte:** `app.js:1337`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `win`
- **Chamadas internas detectadas:** `ensureV7State`, `gainXp`, `rollLoot`, `itemById`, `battleLog`, `toast`, `finishMission`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00245 — `renderTacticalBoard`

- **Fonte:** `app.js:1338`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `gridDistance`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `tactical-move`
- **Status:** `STATICALLY_TRACED`

## FUNC-00246 — `renderCombat`

- **Fonte:** `app.js:1339`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `leonPrivatePanel`, `hardTechniqueAccess`, `gridDistance`, `esc`, `renderTacticalBoard`, `v7ItemArt`, `itemById`, `bars`, `playerAttackRange`, `techniqueRangeV7`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `start-battle`, `end-battle`, `basic-attack`, `defend`, `set-defense`, `battle-item`, `battle-jutsu`
- **Status:** `STATICALLY_TRACED`

## FUNC-00247 — `routeMinigame`

- **Fonte:** `app.js:1340`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,m`
- **Chamadas internas detectadas:** `rand`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `mission-route`
- **Status:** `STATICALLY_TRACED`

## FUNC-00248 — `resolveMissionRoute`

- **Fonte:** `app.js:1341`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** `missionById`, `skillTotal`, `rollTerion2d10`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00249 — `renderActiveMission`

- **Fonte:** `app.js:1342`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `missionById`, `esc`, `routeMinigame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `abandon-mission`, `mission-choice`, `narrate-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00250 — `finishMission`

- **Fonte:** `app.js:1343`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `win,fromBattle=false`
- **Chamadas internas detectadas:** `missionById`, `clamp`, `gainXp`, `rollLoot`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00251 — `npcPortrait`

- **Fonte:** `app.js:1344`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,index=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00252 — `npcInteract`

- **Fonte:** `app.js:1345`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureV7State`, `render`, `modal`, `esc`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `hospital-heal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00253 — `healHospital`

- **Fonte:** `app.js:1346`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cost`
- **Chamadas internas detectadas:** `toast`, `saveState`, `closeModal`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00254 — `renderVillage`

- **Fonte:** `app.js:1347`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `ensureTravel`, `villageArt`, `selectedWorldVillage`, `pctPos`, `worldRouteExists`, `worldSteps`, `esc`, `gridStyle`, `mapCellButtons`, `travelMissionRows`, `npcPortrait`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `map-mode`, `world-select`, `world-travel`, `map-hotspot`, `map-enter`, `npc-talk`
- **Status:** `STATICALLY_TRACED`

## FUNC-00255 — `villageLocation`

- **Fonte:** `app.js:1348`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `render`, `npcInteract`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00256 — `travelWorld`

- **Fonte:** `app.js:1349`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureV7State`, `ensureTravel`, `worldRouteExists`, `toast`, `mapLog`, `saveState`, `startBattle`, `rollLoot`, `itemById`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00257 — `renderHome`

- **Fonte:** `app.js:1350`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `leonPrivatePanel`, `villageArt`, `inventoryCompartments`, `esc`, `originById`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `save`
- **Status:** `STATICALLY_TRACED`

## FUNC-00258 — `aiGameContext`

- **Fonte:** `app.js:1351`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `originById`, `hijutsuById`, `skillTotal`, `jutsuById`, `itemById`, `missionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00259 — `render`

- **Fonte:** `app.js:1352`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `renderChrome`, `updateAIStatusUI`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00260 — `ensureV74State`

- **Fonte:** `app.js:1390`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV7State`, `ensureLeonKuraiV74`, `refreshDailyEventsV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00261 — `ensureLeonKuraiV74`

- **Fonte:** `app.js:1403`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00262 — `dayKeyV74`

- **Fonte:** `app.js:1411`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00263 — `seededV74`

- **Fonte:** `app.js:1412`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00264 — `refreshDailyEventsV74`

- **Fonte:** `app.js:1413`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `dayKeyV74`, `seededV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00265 — `eventCompletedV74`

- **Fonte:** `app.js:1418`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `dayKeyV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00266 — `activeEventsV74`

- **Fonte:** `app.js:1426`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `village`
- **Chamadas internas detectadas:** `ensureV74State`, `eventCompletedV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00267 — `eventByIdV74`

- **Fonte:** `app.js:1434`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00268 — `eventRewardTextV74`

- **Fonte:** `app.js:1435`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `jutsuById`, `itemById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00269 — `completeEventV74`

- **Fonte:** `app.js:1436`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `itemById`, `gainXp`, `ensureLeonKuraiV74`, `eventRewardTextV74`, `saveState`, `toast`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00270 — `eventTestV74`

- **Fonte:** `app.js:1447`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `toast`, `rollLeon2d10`, `skillTotal`, `rollTerion2d10`, `saveState`, `completeEventV74`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00271 — `eventPanelV74`

- **Fonte:** `app.js:1458`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `esc`, `eventRewardTextV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `event-step`, `event-close`
- **Status:** `STATICALLY_TRACED`

## FUNC-00272 — `buyCard`

- **Fonte:** `app.js:1477`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** `itemPrice`, `v7ItemArt`, `esc`, `itemCategory`, `itemRarity`, `itemDescription`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `shop-qty`, `shop-buy-qty`
- **Status:** `STATICALLY_TRACED`

## FUNC-00273 — `sellCard`

- **Fonte:** `app.js:1478`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `[i,q]`
- **Chamadas internas detectadas:** `salePrice`, `esc`, `v7ItemArt`, `itemDescription`, `fmt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `shop-qty`, `shop-sell-qty`
- **Status:** `STATICALLY_TRACED`

## FUNC-00274 — `buyQtyV74`

- **Fonte:** `app.js:1481`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `shopItemAllowed`, `toast`, `itemPrice`, `inventoryCompartments`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00275 — `sellQtyV74`

- **Fonte:** `app.js:1482`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `itemById`, `toast`, `salePrice`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00276 — `kuraiCardV74`

- **Fonte:** `app.js:1490`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `ensureLeonKuraiV74`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00277 — `leonDojoV74`

- **Fonte:** `app.js:1508`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `level`
- **Chamadas internas detectadas:** `ensureLeonKuraiV74`, `rollLeon2d10`, `gainXp`, `saveState`, `modal`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `close-modal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00278 — `ensureV75State`

- **Fonte:** `app.js:1570`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV74State`, `recalc`, `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00279 — `v75Norm`

- **Fonte:** `app.js:1604`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00280 — `v75CostText`

- **Fonte:** `app.js:1605`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cost`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00281 — `v75JutsuArt`

- **Fonte:** `app.js:1619`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00282 — `v75LeonTechArt`

- **Fonte:** `app.js:1620`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `t`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00283 — `rinnePath`

- **Fonte:** `app.js:1622`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00284 — `rinneUnlocked`

- **Fonte:** `app.js:1623`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00285 — `rinneRequirementStatus`

- **Fonte:** `app.js:1624`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `path`
- **Chamadas internas detectadas:** `skillTotal`, `powerById`, `rinneUnlocked`, `aptitudeById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00286 — `unlockRinnePathV75`

- **Fonte:** `app.js:1633`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `ensureV75State`, `rinnePath`, `rinneUnlocked`, `rinneRequirementStatus`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00287 — `v75NormalActions`

- **Fonte:** `app.js:1640`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `jutsuById`, `hardTechniqueAccess`, `test`, `v75JutsuArt`, `aptitudeById`, `powerById`, `rinneUnlocked`, `itemById`, `itemDescription`, `v7ItemArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00288 — `v75LeonActions`

- **Fonte:** `app.js:1672`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `test`, `v75Norm`, `v75LeonTechArt`, `itemById`, `itemDescription`, `v7ItemArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00289 — `v75Actions`

- **Fonte:** `app.js:1702`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV75State`, `v75LeonActions`, `v75NormalActions`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00290 — `v75Action`

- **Fonte:** `app.js:1703`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v75Actions`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00291 — `v75ResolvedCost`

- **Fonte:** `app.js:1705`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,choice={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00292 — `v75CanPay`

- **Fonte:** `app.js:1722`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cost`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00293 — `v75Deduct`

- **Fonte:** `app.js:1723`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cost`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00294 — `v75PromptAction`

- **Fonte:** `app.js:1725`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `esc`, `modal`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `rpg-confirm-cost`
- **Status:** `STATICALLY_TRACED`

## FUNC-00295 — `useRpgActionV75`

- **Fonte:** `app.js:1739`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,choice={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00296 — `rpgRollV75`

- **Fonte:** `app.js:1767`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key`
- **Chamadas internas detectadas:** `ensureV75State`, `clamp`, `v75Norm`, `rollLeon2d10`, `skillTotal`, `rollTerion2d10`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00297 — `v75HasEffects`

- **Fonte:** `app.js:1777`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00298 — `v75EffectsPanel`

- **Fonte:** `app.js:1781`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v75HasEffects`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `apply-ai-effects`
- **Status:** `STATICALLY_TRACED`

## FUNC-00299 — `v75ConditionRow`

- **Fonte:** `app.js:1787`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00300 — `v75ResourceControls`

- **Fonte:** `app.js:1791`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,value,max,label`
- **Chamadas internas detectadas:** `esc`, `pct`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `rpg-resource`
- **Status:** `STATICALLY_TRACED`

## FUNC-00301 — `adjustRpgResourceV75`

- **Fonte:** `app.js:1794`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `spec`
- **Chamadas internas detectadas:** `clamp`, `saveState`, `renderChrome`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00302 — `v75SheetPanel`

- **Fonte:** `app.js:1805`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `esc`, `v75ResourceControls`, `v75ConditionRow`, `skillTotal`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `rpg-roll`, `save`
- **Status:** `STATICALLY_TRACED`

## FUNC-00303 — `v75ActionCard`

- **Fonte:** `app.js:1814`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `v75ResolvedCost`, `v75CanPay`, `v75CostText`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `rpg-select`, `rpg-use`
- **Status:** `STATICALLY_TRACED`

## FUNC-00304 — `renderAIV75`

- **Fonte:** `app.js:1821`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureV75State`, `v75Actions`, `v75Norm`, `v75Action`, `esc`, `v75SheetPanel`, `v75EffectsPanel`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `ai-check`, `save`, `rpg-option`, `ai-custom`, `rpg-continue`, `rpg-tab`
- **Status:** `STATICALLY_TRACED`

## FUNC-00305 — `maxUnlocked`

- **Fonte:** `app.js:1864`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(`
- **Chamadas internas detectadas:** `validateCreationStep`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00306 — `privateAccessAllowed`

- **Fonte:** `app.js:1902`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00307 — `v8EnsureCreationVisuals`

- **Fonte:** `app.js:1961`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00308 — `v8VisualSummary`

- **Fonte:** `app.js:1967`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d=getCreationDraft(`
- **Chamadas internas detectadas:** `v8EnsureCreationVisuals`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00309 — `v8ChoiceButtons`

- **Fonte:** `app.js:1971`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,list,selected`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-visual`
- **Status:** `STATICALLY_TRACED`

## FUNC-00310 — `v8ProgressHtml`

- **Fonte:** `app.js:1974`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c=state.character`
- **Chamadas internas detectadas:** `xpNeeded`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00311 — `v8Asset`

- **Fonte:** `app.js:2105`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00312 — `v8CreatorAsset`

- **Fonte:** `app.js:2106`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00313 — `v8TechAsset`

- **Fonte:** `app.js:2107`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00314 — `v8ItemAsset`

- **Fonte:** `app.js:2108`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00315 — `v8ActionAsset`

- **Fonte:** `app.js:2109`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00316 — `v8EventAsset`

- **Fonte:** `app.js:2110`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00317 — `v8XpTableRows`

- **Fonte:** `app.js:2145`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `xpNeeded`, `ncFor`, `graduationFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00318 — `v8TechniqueFallback`

- **Fonte:** `app.js:2176`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v75Norm`, `test`, `v8TechAsset`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00319 — `v8ItemFallback`

- **Fonte:** `app.js:2177`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** `v75Norm`, `test`, `v8ItemAsset`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00320 — `v8LeonTerrain`

- **Fonte:** `app.js:2184`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00321 — `v8StartLeonBattle`

- **Fonte:** `app.js:2185`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `elite=false`
- **Chamadas internas detectadas:** `ensureLeonKuraiV74`, `v8LeonTerrain`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00322 — `v8LeonSkillFor`

- **Fonte:** `app.js:2189`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00323 — `v8LeonDefenseCD`

- **Fonte:** `app.js:2190`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00324 — `v8LeonLog`

- **Fonte:** `app.js:2191`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `text,type='info'`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00325 — `v8LeonFinish`

- **Fonte:** `app.js:2192`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `win`
- **Chamadas internas detectadas:** `gainXp`, `v8LeonLog`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00326 — `v8LeonNextTurn`

- **Fonte:** `app.js:2193`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00327 — `v8LeonEnemyTurn`

- **Fonte:** `app.js:2194`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `gridDistance`, `clamp`, `v8LeonLog`, `v8LeonNextTurn`, `rollLeon2d10`, `v8LeonDefenseCD`, `v8LeonFinish`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00328 — `v8LeonBasicAttack`

- **Fonte:** `app.js:2195`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `gridDistance`, `toast`, `v8LeonSkillFor`, `rollLeon2d10`, `v8LeonLog`, `v8LeonFinish`, `v8LeonEnemyTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00329 — `v8LeonDefend`

- **Fonte:** `app.js:2196`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mode='defend'`
- **Chamadas internas detectadas:** `v8LeonLog`, `v8LeonEnemyTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00330 — `v8LeonPromptCombat`

- **Fonte:** `app.js:2197`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `esc`, `modal`, `v8TechniqueFallback`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-leon-tech-confirm`, `close-modal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00331 — `v8LeonUseAction`

- **Fonte:** `app.js:2198`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,choice={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00332 — `v8LeonBoard`

- **Fonte:** `app.js:2199`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `gridDistance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-leon-move`
- **Status:** `STATICALLY_TRACED`

## FUNC-00333 — `v8RenderLeonCombat`

- **Fonte:** `app.js:2200`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v75Actions`, `gridDistance`, `esc`, `v8LeonDefenseCD`, `v8LeonBoard`, `v8ActionAsset`, `v8TechniqueFallback`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-start-leon`, `v8-leon-exit`, `v8-leon-basic`, `v8-leon-defend`, `v8-leon-dodge`, `v8-leon-focus`, `v8-leon-flee`, `v8-battle-ai`, `v8-leon-tech`
- **Status:** `STATICALLY_TRACED`

## FUNC-00334 — `v81IsLeon`

- **Fonte:** `app.js:2255`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00335 — `v81LeonCaps`

- **Fonte:** `app.js:2256`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00336 — `v81CapGroup`

- **Fonte:** `app.js:2259`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00337 — `v81PaletteGroup`

- **Fonte:** `app.js:2269`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `group`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00338 — `v81CapArt`

- **Fonte:** `app.js:2272`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** `v81CapGroup`, `v75Norm`, `v8TechAsset`, `test`, `v8TechniqueFallback`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00339 — `v81ActionId`

- **Fonte:** `app.js:2280`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** `v81CapGroup`, `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00340 — `v81SyncLeonPrivate`

- **Fonte:** `app.js:2287`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v81IsLeon`, `clamp`, `v81LeonCaps`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00341 — `matchTab`

- **Fonte:** `app.js:2353`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00342 — `count`

- **Fonte:** `app.js:2355`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00343 — `v81CapCard`

- **Fonte:** `app.js:2370`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** `v81CapGroup`, `v75Action`, `v81ActionId`, `v75CostText`, `esc`, `v81CapArt`, `v8TechAsset`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v81-cap-open`, `rpg-use`
- **Status:** `STATICALLY_TRACED`

## FUNC-00344 — `v81CodexNav`

- **Fonte:** `app.js:2383`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `active`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v81-codex-tab`
- **Status:** `STATICALLY_TRACED`

## FUNC-00345 — `v81KusenroCodex`

- **Fonte:** `app.js:2384`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v81LeonCaps`, `v81CapGroup`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00346 — `v81SuirinCodex`

- **Fonte:** `app.js:2388`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00347 — `v81KuraiCodex`

- **Fonte:** `app.js:2392`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `kurai-mode`
- **Status:** `STATICALLY_TRACED`

## FUNC-00348 — `v81Progression`

- **Fonte:** `app.js:2403`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `xpNeeded`, `v8XpTableRows`, `esc`, `graduationFor`, `fmt`, `v81IsLeon`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-xp-table`, `v81-ai-progression`
- **Status:** `STATICALLY_TRACED`

## FUNC-00349 — `v81CombatTabDefs`

- **Fonte:** `app.js:2476`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00350 — `v81CombatActions`

- **Fonte:** `app.js:2477`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v75Norm`, `v75Actions`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00351 — `v81CombatActionCard`

- **Fonte:** `app.js:2487`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b,c`
- **Chamadas internas detectadas:** `esc`, `v8TechniqueFallback`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v8-leon-tech`
- **Status:** `STATICALLY_TRACED`

## FUNC-00352 — `v82DamageGrade`

- **Fonte:** `app.js:2554`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `raw`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00353 — `v82DamageGradeLabel`

- **Fonte:** `app.js:2555`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `g`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00354 — `v82OfficialBaseDamage`

- **Fonte:** `app.js:2556`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mode='melee',j=null`
- **Chamadas internas detectadas:** `weaponDamage`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00355 — `v82AttackMode`

- **Fonte:** `app.js:2561`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `itemById`, `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00356 — `v82ResolvePlayerAttack`

- **Fonte:** `app.js:2562`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mode='melee'`
- **Chamadas internas detectadas:** `gridDistance`, `toast`, `rollTerion2d10`, `conditionPenalty`, `v82DamageGrade`, `v82OfficialBaseDamage`, `battleLog`, `v82DamageGradeLabel`, `finishBattle`, `enemyTurn`, `advanceBattleTurn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00357 — `v82LeonOutcome`

- **Fonte:** `app.js:2585`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d,total,cd`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00358 — `v84NormKey`

- **Fonte:** `app.js:2609`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00359 — `v84Visual`

- **Fonte:** `app.js:2610`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,id,name,fallback=''`
- **Chamadas internas detectadas:** `v84NormKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00360 — `v82OriginArt`

- **Fonte:** `app.js:2615`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v84Visual`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00361 — `v82JutsuArt`

- **Fonte:** `app.js:2616`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v84Visual`, `v8TechniqueFallback`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00362 — `v82Learnable`

- **Fonte:** `app.js:2617`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `characterCanLearn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00363 — `v82OwnedNormal`

- **Fonte:** `app.js:2618`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00364 — `v82LeonTechCard`

- **Fonte:** `app.js:2657`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** `v75Action`, `v81ActionId`, `v81CapGroup`, `esc`, `v81CapArt`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v81-cap-open`, `rpg-use`
- **Status:** `STATICALLY_TRACED`

## FUNC-00365 — `v82NormalTechCard`

- **Fonte:** `app.js:2658`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j,tab`
- **Chamadas internas detectadas:** `v82JutsuArt`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v82-train-tech`, `v82-use-outside`
- **Status:** `STATICALLY_TRACED`

## FUNC-00366 — `v82EnsureTraining`

- **Fonte:** `app.js:2660`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00367 — `v82TrainingRoll`

- **Fonte:** `app.js:2661`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `skillId`
- **Chamadas internas detectadas:** `v81IsLeon`, `rollLeon2d10`, `rollTerion2d10`, `skillTotal`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00368 — `v82PracticeSkill`

- **Fonte:** `app.js:2662`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v82EnsureTraining`, `v82TrainingRoll`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00369 — `v82PracticeTech`

- **Fonte:** `app.js:2663`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v82EnsureTraining`, `v81IsLeon`, `v82TrainingRoll`, `jutsuById`, `saveState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00370 — `skillName`

- **Fonte:** `app.js:2667`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v82-practice-skill`
- **Status:** `STATICALLY_TRACED`

## FUNC-00371 — `v82Progression`

- **Fonte:** `app.js:2677`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `clamp`, `esc`, `graduationFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v81-ai-progression`
- **Status:** `STATICALLY_TRACED`

## FUNC-00372 — `v82CurrentNPCs`

- **Fonte:** `app.js:2683`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00373 — `v82ActionList`

- **Fonte:** `app.js:2684`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v75Actions`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00374 — `v82NarrationCard`

- **Fonte:** `app.js:2685`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `esc`, `v8TechniqueFallback`, `v75CostText`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v82-select-action`, `rpg-use`
- **Status:** `STATICALLY_TRACED`

## FUNC-00375 — `v82RenderLeonCodex`

- **Fonte:** `app.js:2697`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `tab`
- **Chamadas internas detectadas:** `v81KusenroCodex`, `v81SuirinCodex`, `v81KuraiCodex`, `v81LeonCaps`, `v81CapGroup`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v82-open-resource`
- **Status:** `STATICALLY_TRACED`

## FUNC-00376 — `v82RulesCodex`

- **Fonte:** `app.js:2703`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00377 — `v82NormalBoard`

- **Fonte:** `app.js:2712`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `gridDistance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `tactical-move`
- **Status:** `STATICALLY_TRACED`

## FUNC-00378 — `v82CleanUI`

- **Fonte:** `app.js:2720`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00379 — `v821Clone`

- **Fonte:** `app.js:2805`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00380 — `v821ActiveStatus`

- **Fonte:** `app.js:2806`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `status`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00381 — `v821ApplyLeonCanonical`

- **Fonte:** `app.js:2807`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `target`
- **Chamadas internas detectadas:** `v821Clone`, `clamp`, `v81LeonCaps`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00382 — `v821LeonLocalState`

- **Fonte:** `app.js:2835`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v821ApplyLeonCanonical`, `hydrateState`, `v821Clone`, `warn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00383 — `v821LoadLeon`

- **Fonte:** `app.js:2839`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `v821LeonLocalState`, `ensureV7State`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00384 — `v821ResetLeon`

- **Fonte:** `app.js:2845`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v821LeonLocalState`, `ensureV7State`, `saveState`, `render`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00385 — `v821LoadImage`

- **Fonte:** `app.js:2887`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `src`
- **Chamadas internas detectadas:** `resolve`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00386 — `v821DrawCrop`

- **Fonte:** `app.js:2888`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ctx,img,sx,sy,sw,sh,dx,dy,dw,dh`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00387 — `v821DrawAvatar`

- **Fonte:** `app.js:2889`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `canvas,visuals`
- **Chamadas internas detectadas:** `v821LoadImage`, `v8CreatorAsset`, `v821DrawCrop`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00388 — `v821ComposeAvatarDataUrl`

- **Fonte:** `app.js:2906`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `visuals`
- **Chamadas internas detectadas:** `v821DrawAvatar`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00389 — `v83Copy`

- **Fonte:** `app.js:2944`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00390 — `v83Hash`

- **Fonte:** `app.js:2945`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00391 — `v83ClockLabel`

- **Fonte:** `app.js:2946`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `clock`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00392 — `v83ClockAbsolute`

- **Fonte:** `app.js:2947`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `clock`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00393 — `v83DefaultMasterState`

- **Fonte:** `app.js:2948`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83ClockLabel`, `v83Copy`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00394 — `v83EnsureState`

- **Fonte:** `app.js:2963`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83DefaultMasterState`, `v83ClockLabel`, `v83Copy`, `v81IsLeon`, `v81LeonCaps`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00395 — `v83AdvanceMinutes`

- **Fonte:** `app.js:2983`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `minutes`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83ClockAbsolute`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00396 — `v83WorldTick`

- **Fonte:** `app.js:2984`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `event`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83ClockLabel`, `v83ClockAbsolute`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00397 — `v83Commit`

- **Fonte:** `app.js:2989`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,detail={},minutes=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00398 — `v83SavePoint`

- **Fonte:** `app.js:2990`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `label,changes=[]`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00399 — `v83BeginScene`

- **Fonte:** `app.js:2991`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,label`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00400 — `v83EndScene`

- **Fonte:** `app.js:2992`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00401 — `v83CapCategory`

- **Fonte:** `app.js:2994`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00402 — `v83CapArt`

- **Fonte:** `app.js:2996`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00403 — `v83CapForAction`

- **Fonte:** `app.js:3001`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `actionOrId`
- **Chamadas internas detectadas:** `v81LeonCaps`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00404 — `v83IsPassive`

- **Fonte:** `app.js:3002`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00405 — `v83UsageLimit`

- **Fonte:** `app.js:3003`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00406 — `v83ResourceReasons`

- **Fonte:** `app.js:3004`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00407 — `v83Decision`

- **Fonte:** `app.js:3005`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83IsPassive`, `v83UsageLimit`, `v83ResourceReasons`, `v75Action`, `v81ActionId`, `v83CapCategory`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00408 — `v83CatalogActionDecision`

- **Fonte:** `app.js:3018`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action`
- **Chamadas internas detectadas:** `v83EnsureState`, `v75ResolvedCost`, `v75CanPay`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00409 — `v83ActionDecision`

- **Fonte:** `app.js:3019`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action`
- **Chamadas internas detectadas:** `v83CapForAction`, `v83Decision`, `v83CatalogActionDecision`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00410 — `v83Deactivate`

- **Fonte:** `app.js:3020`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83Commit`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00411 — `v83AfterTechnique`

- **Fonte:** `app.js:3021`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap,context='narrative'`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83Commit`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00412 — `v83TechStatusFilter`

- **Fonte:** `app.js:3031`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `decision`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00413 — `v83TechniqueButton`

- **Fonte:** `app.js:3032`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap,d`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v83-use-tech`
- **Status:** `STATICALLY_TRACED`

## FUNC-00414 — `v83TechniqueCard`

- **Fonte:** `app.js:3033`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cap`
- **Chamadas internas detectadas:** `v83Decision`, `esc`, `v83CapArt`, `v75CostText`, `v83TechniqueButton`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v83-cap-open`
- **Status:** `STATICALLY_TRACED`

## FUNC-00415 — `v83SkillValue`

- **Fonte:** `app.js:3038`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key`
- **Chamadas internas detectadas:** `v83EnsureState`, `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00416 — `v83EligibleMentorIds`

- **Fonte:** `app.js:3039`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00417 — `v83AcquireDecision`

- **Fonte:** `app.js:3040`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v83EnsureState`, `v81LeonCaps`, `v75Norm`, `v83SkillValue`, `v83EligibleMentorIds`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00418 — `v83ProjectFor`

- **Fonte:** `app.js:3041`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00419 — `v83StartProject`

- **Fonte:** `app.js:3042`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `jutsuById`, `v83EnsureState`, `v83AcquireDecision`, `toast`, `v83ClockLabel`, `v83Copy`, `v83Commit`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00420 — `v83TrainingMentor`

- **Fonte:** `app.js:3043`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `project`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `v83-mentor-${v75Norm(project.id)}`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00421 — `v83ProjectSession`

- **Fonte:** `app.js:3044`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `projectId`
- **Chamadas internas detectadas:** `v83EnsureState`, `jutsuById`, `v83AcquireDecision`, `render`, `toast`, `v83TrainingMentor`, `v83EligibleMentorIds`, `v82TrainingRoll`, `v83ClockLabel`, `v83Commit`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00422 — `v83FinalizeProject`

- **Fonte:** `app.js:3045`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `projectId`
- **Chamadas internas detectadas:** `v83EnsureState`, `jutsuById`, `v83AcquireDecision`, `toast`, `v82TrainingRoll`, `v83Commit`, `v83ClockLabel`, `saveState`, `render`, `v83SavePoint`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00423 — `v83PracticeOwned`

- **Fonte:** `app.js:3046`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `v81LeonCaps`, `toast`, `v82TrainingRoll`, `v83ClockLabel`, `v83Commit`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `v83-practice-tech`, `v83-practice-method`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00424 — `v83PracticeSkillAdvance`

- **Fonte:** `app.js:3047`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `v82TrainingRoll`, `v83SavePoint`, `v83ClockLabel`, `v83Commit`, `saveState`, `toast`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `v83-practice-skill`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00425 — `v83VisibleMentors`

- **Fonte:** `app.js:3048`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00426 — `v83MentorOptions`

- **Fonte:** `app.js:3049`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `project`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83EligibleMentorIds`, `jutsuById`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00427 — `v83MissionExercise`

- **Fonte:** `app.js:3050`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v83-mission-training`
- **Status:** `STATICALLY_TRACED`

## FUNC-00428 — `v83CatalogCard`

- **Fonte:** `app.js:3061`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `v83AcquireDecision`, `v83ProjectFor`, `v82JutsuArt`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v83-start-project`
- **Status:** `STATICALLY_TRACED`

## FUNC-00429 — `v83MissionRecord`

- **Fonte:** `app.js:3070`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run`
- **Chamadas internas detectadas:** `v83EnsureState`, `missionById`, `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00430 — `v83MissionAccess`

- **Fonte:** `app.js:3071`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mission`
- **Chamadas internas detectadas:** `v81IsLeon`, `missionAvailable`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00431 — `v83CreateMissionBranch`

- **Fonte:** `app.js:3074`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `choice`
- **Chamadas internas detectadas:** `v83MissionRecord`, `v83Hash`, `v83ClockLabel`, `v83EnsureState`, `v83Copy`, `v83Commit`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00432 — `v83ResolveMissionEvent`

- **Fonte:** `app.js:3075`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `missionId`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83BeginScene`, `v81IsLeon`, `v8StartLeonBattle`, `startBattle`, `saveState`, `render`, `v84TrainerCanUnlock`, `v83Hash`, `v83ClockLabel`, `v83Commit`, `toast`, `v82TrainingRoll`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00433 — `v83CompleteMissionTraining`

- **Fonte:** `app.js:3076`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `missionId`
- **Chamadas internas detectadas:** `v83EnsureState`, `v82TrainingRoll`, `v83ClockLabel`, `v83Commit`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00434 — `v83CombatRoundTick`

- **Fonte:** `app.js:3090`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83AdvanceMinutes`, `v83WorldTick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00435 — `v84Clone`

- **Fonte:** `app.js:3149`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `apiHeaders`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00436 — `v84Api`

- **Fonte:** `app.js:3150`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `route,body=null`
- **Chamadas internas detectadas:** `apiHeaders`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00437 — `v84MigrateLeon`

- **Fonte:** `app.js:3152`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `target,before={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00438 — `v84EnsureMaster`

- **Fonte:** `app.js:3175`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84Clone`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00439 — `v84TrainerCanUnlock`

- **Fonte:** `app.js:3183`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `trainer`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00440 — `v84NpcArt`

- **Fonte:** `app.js:3225`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,index=0`
- **Chamadas internas detectadas:** `v84NormKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00441 — `v84SyncBattleTokens`

- **Fonte:** `app.js:3229`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84EnsureMaster`, `v81IsLeon`, `v84Visual`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00442 — `v84BattlefieldMarkup`

- **Fonte:** `app.js:3237`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `compact=false`
- **Chamadas internas detectadas:** `v84SyncBattleTokens`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v84-cell`, `v84-token`, `v84-map-tool`, `v84-grid-toggle`, `v84-field-preset`
- **Status:** `STATICALLY_TRACED`

## FUNC-00443 — `renderBattlefieldV84`

- **Fonte:** `app.js:3243`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84BattlefieldMarkup`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00444 — `v84SceneActors`

- **Fonte:** `app.js:3245`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84NpcArt`, `npcPortrait`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00445 — `v84IntegrateVisualDraft`

- **Fonte:** `app.js:3255`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84EnsureMaster`, `test`, `v81IsLeon`, `v84Visual`, `v84NpcArt`, `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00446 — `v84SceneStageMarkup`

- **Fonte:** `app.js:3276`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84EnsureMaster`, `v84SceneActors`, `esc`, `v83ClockLabel`, `v84BattlefieldMarkup`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v84-stage-field`, `v84-open-npc`
- **Status:** `STATICALLY_TRACED`

## FUNC-00447 — `renderNpcCodexV84`

- **Fonte:** `app.js:3281`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v84NormKey`, `esc`, `v84NpcArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v84-open-npc`, `v84-npc-more`
- **Status:** `STATICALLY_TRACED`

## FUNC-00448 — `v84KnowledgeMeta`

- **Fonte:** `app.js:3286`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00449 — `r39SemanticKnowledgeFallback`

- **Fonte:** `app.js:3295`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,x`
- **Chamadas internas detectadas:** `v84NormKey`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00450 — `v84KnowledgeImage`

- **Fonte:** `app.js:3320`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,x`
- **Chamadas internas detectadas:** `r39SemanticKnowledgeFallback`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00451 — `renderKnowledgeV84`

- **Fonte:** `app.js:3321`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `toast`, `v84NormKey`, `v84KnowledgeMeta`, `esc`, `test`, `v84KnowledgeImage`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v84-kb-type`, `v84-open-kb`, `v84-kb-more`
- **Status:** `STATICALLY_TRACED`

## FUNC-00452 — `v84OpenKnowledge`

- **Fonte:** `app.js:3326`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,id`
- **Chamadas internas detectadas:** `get`, `esc`, `test`, `modal`, `v84KnowledgeImage`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `close-modal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00453 — `v84OpenNpc`

- **Fonte:** `app.js:3328`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v84SceneActors`, `toast`, `v84NpcArt`, `modal`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `close-modal`
- **Status:** `STATICALLY_TRACED`

## FUNC-00454 — `v84DecorateScreen`

- **Fonte:** `app.js:3349`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `v84NormKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `start-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00455 — `v841CreatorLayer`

- **Fonte:** `app.js:3389`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00456 — `v841ReferenceData`

- **Fonte:** `app.js:3405`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00457 — `v841RecordName`

- **Fonte:** `app.js:3421`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00458 — `v841RecordDesc`

- **Fonte:** `app.js:3422`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00459 — `renderVisualAtlasV841`

- **Fonte:** `app.js:3424`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `v84NormKey`, `v841RecordName`, `v841RecordDesc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v841-atlas-type`, `v841-atlas-more`
- **Status:** `STATICALLY_TRACED`

## FUNC-00460 — `v841CardArt`

- **Fonte:** `app.js:3429`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action,id,kind=''`
- **Chamadas internas detectadas:** `v84NormKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00461 — `v841InsertArt`

- **Fonte:** `app.js:3434`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `host,src,label`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00462 — `v841DecorateScreen`

- **Fonte:** `app.js:3435`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v841CardArt`, `v841InsertArt`, `v84NormKey`, `esc`, `v8CreatorAsset`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `train`
- **Status:** `STATICALLY_TRACED`

## FUNC-00463 — `v841DurationMinutes`

- **Fonte:** `app.js:3453`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value,fallback=120`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00464 — `accountApi`

- **Fonte:** `app.js:3499`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `route,body={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00465 — `accountLocalKey`

- **Fonte:** `app.js:3503`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `slotId=activeSlotId`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00466 — `accountArt`

- **Fonte:** `app.js:3504`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `slot,index=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00467 — `cacheAccount`

- **Fonte:** `app.js:3505`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `account,token`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00468 — `setAccountState`

- **Fonte:** `app.js:3506`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `save,slotId`
- **Chamadas internas detectadas:** `hydrateState`, `recalc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00469 — `loadAccountSlots`

- **Fonte:** `app.js:3510`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountApi`
- **Rotas referidas:** `/api/account/slots`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00470 — `loadAccountSlot`

- **Fonte:** `app.js:3511`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `slotId`
- **Chamadas internas detectadas:** `render`, `accountApi`, `setAccountState`, `accountLocalKey`, `toast`, `v84Api`
- **Rotas referidas:** `/api/account/load`, `/api/v84/bootstrap`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00471 — `loadLeonAccount`

- **Fonte:** `app.js:3514`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountToken`, `accountApi`, `v821ApplyLeonCanonical`, `hydrateState`, `saveState`, `v841SyncAccountSave`, `render`, `v84Api`
- **Rotas referidas:** `/api/account/load`, `/api/v84/bootstrap`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00472 — `startAccountCreation`

- **Fonte:** `app.js:3523`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `defaultState`, `clearCreationDraft`, `newCreationDraft`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00473 — `submitAuth`

- **Fonte:** `app.js:3526`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `accountApi`, `cacheAccount`, `loadLeonAccount`, `toast`, `loadAccountSlots`, `startAccountCreation`, `defaultState`
- **Rotas referidas:** `/api/auth/register`, `/api/auth/login`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00474 — `restoreAuth`

- **Fonte:** `app.js:3535`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountToken`, `render`, `accountApi`, `cacheAccount`, `loadLeonAccount`, `loadAccountSlots`, `defaultState`
- **Rotas referidas:** `/api/auth/me`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00475 — `logoutAccount`

- **Fonte:** `app.js:3540`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountApi`, `defaultState`, `render`
- **Rotas referidas:** `/api/auth/logout`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00476 — `deleteAccountSlot`

- **Fonte:** `app.js:3543`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `slotId`
- **Chamadas internas detectadas:** `render`, `accountApi`, `accountLocalKey`, `loadAccountSlots`, `toast`
- **Rotas referidas:** `/api/account/delete`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00477 — `importLegacySlots`

- **Fonte:** `app.js:3546`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `readSlotIndex`, `accountApi`, `loadAccountSlots`, `render`, `toast`
- **Rotas referidas:** `/api/account/save`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00478 — `renderAccessV841`

- **Fonte:** `app.js:3550`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `add`, `accountToken`, `r31Asset`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `app`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `auth-mode`, `auth-submit`
- **Status:** `STATICALLY_TRACED`

## FUNC-00479 — `renderAccountSlotsV841`

- **Fonte:** `app.js:3587`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`, `readSlotIndex`, `accountArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `app`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `account-new`, `account-logout`, `account-load`, `account-delete`, `account-import-legacy`
- **Status:** `STATICALLY_TRACED`

## FUNC-00480 — `decorateAccountChrome`

- **Fonte:** `app.js:3592`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `app`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `account-logout`
- **Status:** `STATICALLY_TRACED`

## FUNC-00481 — `v841SyncAccountSave`

- **Fonte:** `app.js:3595`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `silent=true`
- **Chamadas internas detectadas:** `newId`, `accountApi`, `toast`
- **Rotas referidas:** `/api/account/save`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00482 — `r25Duo`

- **Fonte:** `app.js:3627`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `rand`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00483 — `r25Commit`

- **Fonte:** `app.js:3628`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,detail={},minutes=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00484 — `r25CommonCD`

- **Fonte:** `app.js:3632`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `old`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00485 — `r25NarrativeFromChoice`

- **Fonte:** `app.js:3633`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,mission,stage,choice,success,roll,total,cd,damage=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00486 — `r25Rest`

- **Fonte:** `app.js:3665`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind`
- **Chamadas internas detectadas:** `toast`, `test`, `r25Commit`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00487 — `r25TrainerAvailable`

- **Fonte:** `app.js:3668`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `t`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00488 — `r25MentorSession`

- **Fonte:** `app.js:3671`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r25TrainerAvailable`, `toast`, `r25Commit`, `callAI`, `aiGameContext`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00489 — `r25NpcRoutineSlot`

- **Fonte:** `app.js:3685`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,clock`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00490 — `r25NpcRuntime`

- **Fonte:** `app.js:3689`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n`
- **Chamadas internas detectadas:** `r25NpcRoutineSlot`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00491 — `r25CoreDefaults`

- **Fonte:** `app.js:3743`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00492 — `r25CoreSpent`

- **Fonte:** `app.js:3744`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00493 — `r25CoreFromLegacy`

- **Fonte:** `app.js:3745`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `clamp`, `r25CoreDefaults`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00494 — `r25SyncLegacyFromCore`

- **Fonte:** `app.js:3755`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `r25CoreDefaults`, `clamp`, `creationSocialSpent`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00495 — `r25ChangeCoreAttr`

- **Fonte:** `app.js:3780`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,delta`
- **Chamadas internas detectadas:** `getCreationDraft`, `r25CoreSpent`, `r25SyncLegacyFromCore`, `writeCreationDraft`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00496 — `r25CoreResourcePreview`

- **Fonte:** `app.js:3781`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `r25CoreDefaults`, `originBonusObject`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00497 — `r25CoreCreatorHTML`

- **Fonte:** `app.js:3782`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `r25CoreSpent`, `r25CoreResourcePreview`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r25-core-attr`
- **Status:** `STATICALLY_TRACED`

## FUNC-00498 — `r25CoreReviewHTML`

- **Fonte:** `app.js:3783`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** `originById`, `hijutsuById`, `professionById`, `r25CoreResourcePreview`, `esc`, `creationSkillSpent`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `create-character`
- **Status:** `STATICALLY_TRACED`

## FUNC-00499 — `r25ReplaceWizardMiddle`

- **Fonte:** `app.js:3784`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `html`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00500 — `r25LegacyFromCoreValues`

- **Fonte:** `app.js:3788`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `t`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00501 — `r25ApplyCoreResources`

- **Fonte:** `app.js:3789`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,refill=false,old={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00502 — `r27AbsMinute`

- **Fonte:** `app.js:3807`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83ClockAbsolute`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00503 — `r27Copy`

- **Fonte:** `app.js:3808`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00504 — `r27Ensure`

- **Fonte:** `app.js:3809`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00505 — `r27TrainingRecent`

- **Fonte:** `app.js:3819`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `s,now`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00506 — `r27TrainingGate`

- **Fonte:** `app.js:3820`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `focus,minutes,{allowDuringMission=false}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00507 — `r27TrainingBlock`

- **Fonte:** `app.js:3837`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `focus,minutes,reason`
- **Chamadas internas detectadas:** `r27Ensure`, `v83ClockLabel`, `r27AbsMinute`, `toast`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00508 — `r27RecordTraining`

- **Fonte:** `app.js:3841`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `focus,minutes,detail={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00509 — `r27RestSafety`

- **Fonte:** `app.js:3845`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind`
- **Chamadas internas detectadas:** `r27Ensure`, `r27AbsMinute`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00510 — `r27ApplyAIResultEffects`

- **Fonte:** `app.js:3849`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00511 — `num`

- **Fonte:** `app.js:3852`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `k`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00512 — `r27EnemyArtForOpponent`

- **Fonte:** `app.js:3870`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `opp={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00513 — `r27BattleDims`

- **Fonte:** `app.js:3883`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00514 — `r27NormalizeOpponent`

- **Fonte:** `app.js:3884`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `opp,i,b`
- **Chamadas internas detectadas:** `test`, `r27EnemyArtForOpponent`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00515 — `r27SetBattleOpponents`

- **Fonte:** `app.js:3885`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,opponents=[]`
- **Chamadas internas detectadas:** `r27BattleDims`, `r27NormalizeOpponent`, `clamp`, `add`, `r27SyncBattleTarget`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00516 — `r27ActiveEnemies`

- **Fonte:** `app.js:3886`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00517 — `r27SyncBattleTarget`

- **Fonte:** `app.js:3887`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `r27ActiveEnemies`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00518 — `r27SelectBattleTarget`

- **Fonte:** `app.js:3888`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r27ActiveEnemies`, `r27SyncBattleTarget`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00519 — `r27CellBlocked`

- **Fonte:** `app.js:3889`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,x,y,selfId=''`
- **Chamadas internas detectadas:** `r27ActiveEnemies`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00520 — `r27PathStep`

- **Fonte:** `app.js:3890`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,from,to,selfId,maxSteps=1,away=false`
- **Chamadas internas detectadas:** `r27BattleDims`, `r27CellBlocked`, `gridDistance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00521 — `r27EnemyIntent`

- **Fonte:** `app.js:3891`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e,pos,b`
- **Chamadas internas detectadas:** `gridDistance`, `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00522 — `r27TargetStrip`

- **Fonte:** `app.js:3892`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `r27ActiveEnemies`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-target-enemy`
- **Status:** `STATICALLY_TRACED`

## FUNC-00523 — `r27TrainingData`

- **Fonte:** `app.js:3941`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00524 — `r27TechniqueTrack`

- **Fonte:** `app.js:3942`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r27TrainingData`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00525 — `r27TechniqueForms`

- **Fonte:** `app.js:3943`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `track`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00526 — `r27UpdateTechniqueForms`

- **Fonte:** `app.js:3944`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,j,track`
- **Chamadas internas detectadas:** `r27TechniqueForms`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00527 — `r27CommonSkillPractice`

- **Fonte:** `app.js:3945`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v83EnsureState`, `r27TrainingGate`, `r27TrainingBlock`, `toast`, `r27TrainingData`, `v82TrainingRoll`, `v83Commit`, `r27RecordTraining`, `v83ClockLabel`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00528 — `r27CommonTechniquePractice`

- **Fonte:** `app.js:3946`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,method='solo'`
- **Chamadas internas detectadas:** `jutsuById`, `toast`, `v82Learnable`, `r27TrainingGate`, `r27TrainingBlock`, `v82TrainingRoll`, `r27TechniqueTrack`, `v83ClockLabel`, `v83EnsureState`, `v83Commit`, `r27RecordTraining`, `r27UpdateTechniqueForms`, `saveState`, `render`, `r27Copy`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00529 — `r27DojoPractice`

- **Fonte:** `app.js:3951`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v81IsLeon`, `toast`, `r27CommonTechniquePractice`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00530 — `r27RestUnified`

- **Fonte:** `app.js:3958`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind='short'`
- **Chamadas internas detectadas:** `r27Ensure`, `toast`, `test`, `v83Commit`, `r27RestSafety`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00531 — `r27RenderRest`

- **Fonte:** `app.js:3969`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`, `test`, `esc`, `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-rest`
- **Status:** `STATICALLY_TRACED`

## FUNC-00532 — `r27MaterialSnapshot`

- **Fonte:** `app.js:3977`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83ClockLabel`, `r27Copy`, `r27ActiveEnemies`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00533 — `r27DiffObjects`

- **Fonte:** `app.js:3978`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b,path='',out=[]`
- **Chamadas internas detectadas:** `r27Copy`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00534 — `r27VillageKey`

- **Fonte:** `app.js:3987`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00535 — `r27VillageCenterLocation`

- **Fonte:** `app.js:3988`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v=r27VillageKey(`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00536 — `r27CurrentLocationId`

- **Fonte:** `app.js:3989`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27VillageCenterLocation`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00537 — `r27SetCurrentLocation`

- **Fonte:** `app.js:3990`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,{minutes=0,label='Mudança de local'}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00538 — `r27NpcSameLocation`

- **Fonte:** `app.js:3991`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n`
- **Chamadas internas detectadas:** `r25NpcRuntime`, `r27CurrentLocationId`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00539 — `r27VillageLocationId`

- **Fonte:** `app.js:3992`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action`
- **Chamadas internas detectadas:** `r27VillageKey`, `r27VillageCenterLocation`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00540 — `r27SocialEnsure`

- **Fonte:** `app.js:4001`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00541 — `r27NpcRelation`

- **Fonte:** `app.js:4002`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00542 — `r27RelationLabel`

- **Fonte:** `app.js:4003`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `r`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00543 — `r27NpcByAnyId`

- **Fonte:** `app.js:4004`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00544 — `r27RegisterRumor`

- **Fonte:** `app.js:4005`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `text,{npcIds=[],factionId='',publicAct=false,source='world'}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00545 — `r27SocialInteraction`

- **Fonte:** `app.js:4006`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `npcId,{trust=0,respect=0,friendship=0,rivalry=0,reason='interação',publicAct=false}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00546 — `r27FactionImpact`

- **Fonte:** `app.js:4007`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `factionId,delta,reason`
- **Chamadas internas detectadas:** `r27SocialEnsure`, `clamp`, `r27RegisterRumor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00547 — `r27ApplySocialImpactFromAI`

- **Fonte:** `app.js:4008`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result`
- **Chamadas internas detectadas:** `r27SocialInteraction`, `clamp`, `r27FactionImpact`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00548 — `r27RenderRelationships`

- **Fonte:** `app.js:4011`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27SocialEnsure`, `v83EnsureState`, `r27NpcByAnyId`, `esc`, `v83ClockLabel`, `r25NpcRuntime`, `v84NpcArt`, `r27RelationLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-social-talk`
- **Status:** `STATICALLY_TRACED`

## FUNC-00549 — `r36StoryArc`

- **Fonte:** `app.js:4050`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00550 — `r36StoryChoices`

- **Fonte:** `app.js:4051`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ch`
- **Chamadas internas detectadas:** `r36StoryArc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00551 — `r27StoryChapters`

- **Fonte:** `app.js:4064`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r36StoryArc`, `r36StoryChoices`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00552 — `r27StoryEnsure`

- **Fonte:** `app.js:4065`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00553 — `r27StoryComplete`

- **Fonte:** `app.js:4066`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ch,result={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00554 — `r27StoryEnemySpecs`

- **Fonte:** `app.js:4067`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ch`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00555 — `mk`

- **Fonte:** `app.js:4068`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `x,i=0`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00556 — `r27StoryStart`

- **Fonte:** `app.js:4073`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `chId`
- **Chamadas internas detectadas:** `r27StoryEnsure`, `r27StoryChapters`, `toast`, `v83ClockLabel`, `v83EnsureState`, `v83Commit`, `r27DuelEnsure`, `r27DuelAutoAI`, `saveState`, `render`, `v8StartLeonBattle`, `startBattle`, `r27SetBattleOpponents`, `r27StoryEnemySpecs`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00557 — `r36StoryChance`

- **Fonte:** `app.js:4074`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `bonus,cd`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00558 — `r27StoryChoice`

- **Fonte:** `app.js:4075`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `choiceId`
- **Chamadas internas detectadas:** `r27StoryEnsure`, `r27StoryChapters`, `toast`, `skillTotal`, `v75Norm`, `rollTerion2d10`, `v83Commit`, `r27StoryComplete`, `v83ClockLabel`, `v83EnsureState`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00559 — `r27StoryBattleTick`

- **Fonte:** `app.js:4090`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `r27StoryChapters`, `rand`, `battleLog`, `v8LeonFinish`, `finishBattle`, `r27ActiveEnemies`, `r27SetBattleOpponents`, `r27StoryComplete`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00560 — `r27RenderStory`

- **Fonte:** `app.js:4099`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27StoryEnsure`, `r27StoryChapters`, `esc`, `test`, `skillTotal`, `v75Norm`, `r36StoryChance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-story-abandon`, `r27-story-choice`, `r27-story-start`
- **Status:** `STATICALLY_TRACED`

## FUNC-00561 — `r27DuelEnsure`

- **Fonte:** `app.js:4109`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00562 — `r27DuelEra`

- **Fonte:** `app.js:4110`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00563 — `r27DuelRoster`

- **Fonte:** `app.js:4111`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `test`, `v75Norm`, `add`, `r27DuelEra`, `v84NpcArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00564 — `r27DuelSelect`

- **Fonte:** `app.js:4112`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r27DuelEnsure`, `r27StoryEnsure`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00565 — `r27DuelAutoAI`

- **Fonte:** `app.js:4113`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27DuelEnsure`, `r27DuelRoster`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00566 — `r27DuelFighter`

- **Fonte:** `app.js:4114`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,side,i`
- **Chamadas internas detectadas:** `v84NpcArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00567 — `byId`

- **Fonte:** `app.js:4115`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r27DuelFighter`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00568 — `r27StartDuel`

- **Fonte:** `app.js:4115`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27DuelEnsure`, `toast`, `r27DuelAutoAI`, `r27DuelFighter`, `byId`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00569 — `r27DuelAlive`

- **Fonte:** `app.js:4116`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `list`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00570 — `r27DuelCurrent`

- **Fonte:** `app.js:4117`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00571 — `r27DuelTarget`

- **Fonte:** `app.js:4118`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00572 — `r27DuelRoll`

- **Fonte:** `app.js:4119`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `attacker,target,kind='attack'`
- **Chamadas internas detectadas:** `r25Duo`, `rand`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00573 — `r27DuelCheckEnd`

- **Fonte:** `app.js:4120`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `r27DuelAlive`, `r27DuelEnsure`, `v83ClockLabel`, `v83EnsureState`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00574 — `r27DuelAIRound`

- **Fonte:** `app.js:4121`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `r27DuelAlive`, `r27DuelCheckEnd`, `r27DuelRoll`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00575 — `r27DuelAction`

- **Fonte:** `app.js:4122`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind`
- **Chamadas internas detectadas:** `r27DuelEnsure`, `r27DuelCurrent`, `r27DuelTarget`, `toast`, `r27DuelRoll`, `r27DuelCheckEnd`, `saveState`, `render`, `r27DuelAIRound`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00576 — `r27RenderDuel`

- **Fonte:** `app.js:4123`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27DuelEnsure`, `r27DuelRoster`, `esc`, `r27StoryEnsure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-duel-reset`, `r27-duel-active`, `r27-duel-target`, `r27-duel-action`, `r27-duel-select`, `r27-duel-ai`, `r27-duel-start`, `r27-duel-filter`
- **Status:** `STATICALLY_TRACED`

## FUNC-00577 — `r27ActionValidation`

- **Fonte:** `app.js:4136`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00578 — `r27QuickCards`

- **Fonte:** `app.js:4137`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00579 — `r27GMFormat`

- **Fonte:** `app.js:4138`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00580 — `r27RuntimeValidation`

- **Fonte:** `app.js:4139`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00581 — `r27InvocationEnsure`

- **Fonte:** `app.js:4140`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00582 — `r27GrantInvocationContract`

- **Fonte:** `app.js:4141`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `contract,{source='event',evidence=''}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00583 — `r27Summon`

- **Fonte:** `app.js:4142`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `contractId,rank=1`
- **Chamadas internas detectadas:** `r27InvocationEnsure`, `v83ClockLabel`, `v83EnsureState`, `saveState`, `r27Copy`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00584 — `r27SenjutsuEnsure`

- **Fonte:** `app.js:4143`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00585 — `r27SenjutsuGather`

- **Fonte:** `app.js:4144`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27SenjutsuEnsure`, `v83ClockLabel`, `v83EnsureState`, `rollTerion2d10`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00586 — `r27CampaignAudit`

- **Fonte:** `app.js:4145`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83EnsureState`, `r27RuntimeValidation`, `r27CanonEnsure`, `missionById`, `r27CurrentLocationId`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00587 — `r27SystemDispatch`

- **Fonte:** `app.js:4146`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00588 — `r27RenderSystems`

- **Fonte:** `app.js:4147`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27SystemDispatch`, `esc`, `r27CampaignAudit`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r27-system-audit`
- **Status:** `STATICALLY_TRACED`

## FUNC-00589 — `r27ApplyLeonAuthority`

- **Fonte:** `app.js:4161`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `target`
- **Chamadas internas detectadas:** `clamp`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00590 — `r27WorldMission`

- **Fonte:** `app.js:4230`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00591 — `r27MissionStageTitle`

- **Fonte:** `app.js:4231`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,mission`
- **Chamadas internas detectadas:** `r27WorldMission`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00592 — `r27MissionScriptedNarrative`

- **Fonte:** `app.js:4232`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `{mission,run,choice,roll,total,cd,success,damage=0,minutes=30,aiText='',combatConfirmed=null}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00593 — `r27ArcNumber`

- **Fonte:** `app.js:4249`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00594 — `r27CanonEnsure`

- **Fonte:** `app.js:4250`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r27Ensure`, `r27ArcNumber`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00595 — `r27CanonPreviousResolved`

- **Fonte:** `app.js:4251`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ev,c=r27CanonEnsure(`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00596 — `r27CanonPlayerLocation`

- **Fonte:** `app.js:4252`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00597 — `r27CanonLocationMatch`

- **Fonte:** `app.js:4253`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ev`
- **Chamadas internas detectadas:** `v75Norm`, `r27CanonPlayerLocation`, `r27CanonRoster`, `r25NpcRuntime`, `v84NpcArt`, `r27CanonPendingSync`, `test`, `r27ProcessCanonTriggers`, `r27CanonEnsure`, `r27CanonPreviousResolved`, `v83ClockLabel`, `v83EnsureState`, `r27CanonValidEvidence`, `r27ResolveCanonEvent`, `r27Copy`, `saveState`, `r27ApplyCanonEvidenceFromAI`, `r27ActiveEnemies`, `gainXp`, `battleLog`, `r27SyncBattleTarget`, `render`, `v8LeonLog`, `r27EnemyIntent`, `r27PathStep`, `r27BattleDims`, `gridDistance`, `rollTerion2d10`, `terrainAt`, `conditionPenalty`, `itemById`, `finishBattle`, `rollLeon2d10`, `v8LeonDefenseCD`, `v8LeonFinish`, `v8LeonNextTurn`, `esc`, `r27TargetStrip`, `r27SelectBattleTarget`, `getCreationDraft`, `v8EnsureCreationVisuals`, `v8ChoiceButtons`, `v841CreatorLayer`, `r29Hash`, `r29Family`, `r29AssetFor`, `r29NormRank`, `r29Ensure`, `r29RankMax`, `r29CanonRank`, `r27ArcNumber`, `r29SeedCanonMissions`, `r29Assignment`, `r29MissionKind`, `r29ActiveCanonEvent`, `v81IsLeon`, `r29AssignMission`, `r29SideCandidates`, `r29DirectorTick`, `missionById`, `r29MissionAccess`, `toast`, `r29UpdatePromotionPending`, `r29PromotionRequirements`, `r29RankReview`, `aiGameContext`, `callAI`, `aiFallback`, `warn`, `fmt`, `v84KnowledgeMeta`, `v8LeonTerrain`, `r31Asset`, `finishMission`, `v821ApplyLeonCanonical`, `hydrateState`, `defaultState`, `r27TrainingGate`, `r27ApplyAIResultEffects`, `v83AdvanceMinutes`, `r27RecordTraining`, `r27RestSafety`, `r27ApplyLeonAuthority`, `resolveMissionChoice`, `r27SetBattleOpponents`, `v8LeonEnemyTurn`, `enemyTurn`, `r30Pick`, `r30Text`, `r30JutsuArt`, `r30ItemArt`, `r30SkillArt`, `r30AptArt`, `r30ResourceArt`, `r30CharacterArt`, `r30NpcArt`, `r30TitleArt`, `r30EffectArt`, `r30Ensure`, `r30UnlockTitle`, `r30RevealSecret`, `r30ResolveSecret`, `r30SecretDef`, `r30EvaluateSecrets`, `r30TitlesHtml`, `skillTotal`, `accountArt`, `readSlotIndex`, `loadLeonAccount`, `renderAccountSlotsV841`, `r31GeneratedItemPool`, `r31EnsureCatalogItems`, `r31Ensure`, `r31Clock`, `r31Commit`, `r31Norm`, `v84NormKey`, `r31HasOwned`, `r31GradId`, `r31Metric`, `r31Category`, `r31MentorFor`, `r31SourceUnlocked`, `r31LineageRequirement`, `r31RequiredItemForTechnique`, `r31InventoryHas`, `r31EquipmentRequirement`, `r31RuntimePrerequisites`, `jutsuById`, `r31TechniqueAccess`, `v75Action`, `v75Actions`, `v83ActionDecision`, `r31RecordTechniqueUse`, `r31ExpireActiveTechniques`, `r31TechniqueDamageProfile`, `clamp`, `r31TechniqueStatusLabel`, `v8TechniqueFallback`, `v75CostText`, `r31TechniqueMentorAvailable`, `add`, `r31ResolveTrainingOpportunity`, `r31OpportunityFromBranch`, `r31MissionBranches`, `r31SyncMissionBranches`, `r31ResolveMentorOpportunity`, `r31DiscoverMentorForOpportunity`, `v83Hash`, `r31ResolveOpportunity`, `startBattle`, `r25Duo`, `v83SkillValue`, `r31MentorTechniqueCandidates`, `r31MentorSession`, `r27TrainingBlock`, `v82TrainingRoll`, `r31TechniqueArt`, `r31Semantic`, `r31UniqueAssets`, `r31PickVisualPool`, `r31VariantContext`, `r31ItemArt`, `r31NpcArt`, `r31EnemyArt`, `r31MissionArt`, `r31VendorArt`, `r31TechniqueCard`, `r31PartyDef`, `r31PartyHtml`, `r31PartyToggle`, `r31RandomBattle`, `v83ClockAbsolute`, `r31PartyAction`, `r31BattlefieldArt`, `r31BoardHtml`, `r31AptitudeArt`, `r31SkillArt`, `r31ResourceArt`, `r27CommonTechniquePractice`, `r31VisualCoverage`, `allItems`, `r31PlaceholderPolicy`, `r31StaticAcceptance`, `r31QaEnter`, `ensureV7State`, `r31QaAcceptance`, `r31InstallVisualMaps`, `bind`, `r31DecorateUI`, `r32Clone`, `r32MissionRuntime`, `r32ActiveAssignment`, `r32PersistMissionRuntime`, `r32RestoreMissionRuntime`, `r32ActiveMission`, `r32MissionDependencyIds`, `r32MissionContinuityGate`, `r33Script`, `r33Bonus`, `r33CD`, `r33Chance`, `r33Outcome`, `r33ApplyEffects`, `r33EnsureRun`, `r33Stage`, `r33ChoiceMeta`, `r33EffectSummary`, `r33MissionHeader`, `r33ChoiceCard`, `r33RenderActiveMission`, `r33LocalOpponent`, `r33StartLocalCombat`, `v8StartLeonBattle`, `r25Commit`, `recalc`, `r35MissionError`, `r34RecordClientError`, `r34SaveNow`, `leonSave`, `cloudSave`, `refreshOnlineRoom`, `r382ContentType`, `r382TrueMissions`, `r382Tasks`, `r382Events`, `r382Script`, `r382Mode`, `r382ModeLabel`, `r382CampaignForArc`, `r382ArcById`, `r382NarrativeState`, `r382RemoveLegacyCanonPseudoMissions`, `r382Words`, `r382ArcMissionScore`, `r382ArcMissionCandidate`, `r382RenderNarrativeHub`, `renderChrome`, `r382NarrateArc`, `done`, `r382MissionFreeAction`, `narrateMissionStage`, `r41Clone`, `r41Slug`, `normalize`, `r41AbsMinute`, `r41Ensure`, `ensureLeonKuraiV74`, `r41ActiveInjuries`, `r41PersistentRecoveryCap`, `r41Log`, `r41CloudFlush`, `accountToken`, `r41ScheduleCloudSave`, `r27RestUnified`, `r41HospitalPlan`, `modal`, `r41HospitalTreat`, `closeModal`, `r41GameForText`, `r41RecordMinigame`, `r41OpenMinigame`, `r41BroadcastGameplay`, `resolve`, `finish`, `frame`, `nextTiming`, `nextTargets`, `nextSequence`, `nextReaction`, `nextOdd`, `nextMerge`, `nextWave`, `nextStealth`, `handler`, `next`, `completeEventV74`, `r41ExactVisual`, `v841RecordName`, `v841RecordDesc`, `r41Appearance`, `r41SetVisualState`, `r41AvatarComposite`, `v7ItemArt`, `r41DoActivity`, `r41OnlineAction`, `ensureOnlineState`, `onlinePost`, `onlineCharacterSummary`, `r41OnlineRefresh`, `r41SendOnlineIntent`, `r41CombatSnapshot`, `r41CombatVisual`, `r41PresentDiff`, `checkAIStatus`
- **Rotas referidas:** `/api/online/action`, `/api/online/state`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `r382-mission-free-action`, `modal-root`, `r41-online-intent`, `app`, `r41-seq-input`
- **Storage keys:** `sns-r34-client-errors`
- **Env:** —
- **Ações UI literais:** `tactical-move`, `v8-leon-move`, `r27-target-enemy`, `start-mission`, `r29-rank-review`, `buy-aptitude`, `account-new`, `account-logout`, `account-load-leon`, `account-load`, `account-delete`, `account-import-legacy`, `v82-select-action`, `rpg-use`, `r31-train-technique`, `r31-opportunity`, `r31-mentor-session`, `v82-practice-tech`, `v82-use-outside`, `v82-train-tech`, `r31-tech-state`, `r31-tech-category`, `r31-party-action`, `r31-party-toggle`, `r31-random-battle`, `battle-jutsu`, `${action}`, `r32-resume-mission`, `mission-choice`, `abandon-mission`, `narrate-mission`, `r382-board-tab`, `r382-narrate-arc`, `r382-select-arc`, `r382-mission-free-action`, `r41-hospital-treat`, `v841-atlas-type`, `v841-atlas-more`, `r41-activity`, `r41-online-intent`
- **Status:** `STATICALLY_TRACED`

## FUNC-00598 — `r27CanonRoster`

- **Fonte:** `app.js:4254`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ev`
- **Chamadas internas detectadas:** `r25NpcRuntime`, `v84NpcArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00599 — `r27CanonPendingSync`

- **Fonte:** `app.js:4255`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c,ev`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00600 — `r27ProcessCanonTriggers`

- **Fonte:** `app.js:4256`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `source={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00601 — `r27CanonValidEvidence`

- **Fonte:** `app.js:4257`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00602 — `r27ResolveCanonEvent`

- **Fonte:** `app.js:4258`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,evidence`
- **Chamadas internas detectadas:** `r27CanonEnsure`, `test`, `r27CanonValidEvidence`, `r27Copy`, `v83ClockLabel`, `v83EnsureState`, `r27ProcessCanonTriggers`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00603 — `r27ApplyCanonEvidenceFromAI`

- **Fonte:** `app.js:4259`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result`
- **Chamadas internas detectadas:** `r27CanonEnsure`, `r27ResolveCanonEvent`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00604 — `r29Hash`

- **Fonte:** `app.js:4324`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v=''`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00605 — `r29Family`

- **Fonte:** `app.js:4325`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `o={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00606 — `r29AssetFor`

- **Fonte:** `app.js:4326`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `o={},forced=''`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00607 — `r29NormRank`

- **Fonte:** `app.js:4333`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x=''`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00608 — `r29Ensure`

- **Fonte:** `app.js:4334`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29NormRank`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00609 — `r29RankMax`

- **Fonte:** `app.js:4343`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `rank`
- **Chamadas internas detectadas:** `r29NormRank`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00610 — `r29CanonRank`

- **Fonte:** `app.js:4345`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `ev`
- **Chamadas internas detectadas:** `r27ArcNumber`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00611 — `r29SeedCanonMissions`

- **Fonte:** `app.js:4346`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00612 — `r29Assignment`

- **Fonte:** `app.js:4348`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r29Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00613 — `r29MissionKind`

- **Fonte:** `app.js:4349`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `v75Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00614 — `r29ActiveCanonEvent`

- **Fonte:** `app.js:4350`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`, `v81IsLeon`, `r27CanonEnsure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00615 — `r29AssignMission`

- **Fonte:** `app.js:4351`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m,kind,reason`
- **Chamadas internas detectadas:** `r29Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00616 — `r29SideCandidates`

- **Fonte:** `app.js:4352`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`, `r29RankMax`, `r29Hash`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00617 — `r29DirectorTick`

- **Fonte:** `app.js:4353`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `reason='world_tick'`
- **Chamadas internas detectadas:** `r29Ensure`, `r29ActiveCanonEvent`, `missionById`, `r29AssignMission`, `r29SideCandidates`, `r29MissionKind`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00618 — `r29MissionAccess`

- **Fonte:** `app.js:4361`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `r29Ensure`, `r29RankMax`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00619 — `r29PromotionRequirements`

- **Fonte:** `app.js:4365`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `rank=r29Ensure(`
- **Chamadas internas detectadas:** `r29Ensure`, `r27CanonEnsure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00620 — `r29UpdatePromotionPending`

- **Fonte:** `app.js:4366`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`, `r29PromotionRequirements`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00621 — `r29RankReview`

- **Fonte:** `app.js:4367`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`, `r29UpdatePromotionPending`, `toast`, `aiGameContext`, `callAI`, `aiFallback`, `warn`, `r29NormRank`, `test`, `v75Norm`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00622 — `card`

- **Fonte:** `app.js:4369`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `{a,m}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00623 — `r30Pick`

- **Fonte:** `app.js:4413`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `category,key=''`
- **Chamadas internas detectadas:** `r29Hash`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00624 — `r30Text`

- **Fonte:** `app.js:4414`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `o={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00625 — `r30JutsuArt`

- **Fonte:** `app.js:4415`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00626 — `r30ItemArt`

- **Fonte:** `app.js:4416`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00627 — `r30SkillArt`

- **Fonte:** `app.js:4417`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `sk={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00628 — `r30AptArt`

- **Fonte:** `app.js:4418`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00629 — `r30ResourceArt`

- **Fonte:** `app.js:4419`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key=''`
- **Chamadas internas detectadas:** `v75Norm`, `r29Hash`, `r30Pick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00630 — `r30CharacterArt`

- **Fonte:** `app.js:4420`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key=''`
- **Chamadas internas detectadas:** `r30Pick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00631 — `r30NpcArt`

- **Fonte:** `app.js:4421`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key=''`
- **Chamadas internas detectadas:** `r30Pick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00632 — `r30TitleArt`

- **Fonte:** `app.js:4422`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key=''`
- **Chamadas internas detectadas:** `r30Pick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00633 — `r30EffectArt`

- **Fonte:** `app.js:4423`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key=''`
- **Chamadas internas detectadas:** `r30Pick`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00634 — `r30Ensure`

- **Fonte:** `app.js:4449`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00635 — `r30UnlockTitle`

- **Fonte:** `app.js:4450`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,source='Mestre IA'`
- **Chamadas internas detectadas:** `r30Ensure`, `saveState`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00636 — `r30RevealSecret`

- **Fonte:** `app.js:4451`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,source='Mestre IA'`
- **Chamadas internas detectadas:** `r30Ensure`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00637 — `r30ResolveSecret`

- **Fonte:** `app.js:4452`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,source='Engine'`
- **Chamadas internas detectadas:** `r30Ensure`, `r30RevealSecret`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00638 — `r30SecretDef`

- **Fonte:** `app.js:4453`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00639 — `r30EvaluateSecrets`

- **Fonte:** `app.js:4454`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `reason='world_tick'`
- **Chamadas internas detectadas:** `r30Ensure`, `r29Ensure`, `r29NormRank`, `r30RevealSecret`, `missionById`, `r29AssignMission`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00640 — `r30TitlesHtml`

- **Fonte:** `app.js:4472`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r30Ensure`, `esc`, `r30TitleArt`, `r30EffectArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00641 — `r31GeneratedItemPool`

- **Fonte:** `app.js:4526`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id=''`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00642 — `r31EnsureCatalogItems`

- **Fonte:** `app.js:4537`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00643 — `r31Ensure`

- **Fonte:** `app.js:4540`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00644 — `r31Clock`

- **Fonte:** `app.js:4548`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v83ClockLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00645 — `r31Commit`

- **Fonte:** `app.js:4549`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,detail={},minutes=0,material=false`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00646 — `r31Norm`

- **Fonte:** `app.js:4553`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `v84NormKey`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00647 — `r31HasOwned`

- **Fonte:** `app.js:4554`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00648 — `r31GradId`

- **Fonte:** `app.js:4555`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00649 — `r31Metric`

- **Fonte:** `app.js:4556`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00650 — `r31Category`

- **Fonte:** `app.js:4563`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00651 — `r31MentorFor`

- **Fonte:** `app.js:4564`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00652 — `r31SourceUnlocked`

- **Fonte:** `app.js:4565`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `test`, `r31Ensure`, `r31MentorFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00653 — `r31LineageRequirement`

- **Fonte:** `app.js:4569`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00654 — `r31RequiredItemForTechnique`

- **Fonte:** `app.js:4603`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00655 — `r31InventoryHas`

- **Fonte:** `app.js:4604`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00656 — `r31EquipmentRequirement`

- **Fonte:** `app.js:4605`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `itemById`, `test`, `r31InventoryHas`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00657 — `r31RuntimePrerequisites`

- **Fonte:** `app.js:4614`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Ensure`, `r31HasOwned`, `jutsuById`, `r31RequiredItemForTechnique`, `r31InventoryHas`, `itemById`, `test`, `r31EquipmentRequirement`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00658 — `r31TechniqueAccess`

- **Fonte:** `app.js:4624`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j,{acquisition=false}={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00659 — `r31RecordTechniqueUse`

- **Fonte:** `app.js:4645`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j,context='combat'`
- **Chamadas internas detectadas:** `r31Ensure`, `r31Norm`, `test`, `r31InventoryHas`, `r31Commit`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00660 — `r31ExpireActiveTechniques`

- **Fonte:** `app.js:4651`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `scene=false`
- **Chamadas internas detectadas:** `r31Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00661 — `r31TechniqueDamageProfile`

- **Fonte:** `app.js:4659`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Norm`, `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00662 — `r31TechniqueMentorAvailable`

- **Fonte:** `app.js:4677`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Category`, `r31Norm`, `add`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00663 — `r31OpportunityFromBranch`

- **Fonte:** `app.js:4690`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `branch,missionId=''`
- **Chamadas internas detectadas:** `r31Ensure`, `r31Clock`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00664 — `r31MissionBranches`

- **Fonte:** `app.js:4695`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run=ui.currentMission`
- **Chamadas internas detectadas:** `add`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00665 — `r31SyncMissionBranches`

- **Fonte:** `app.js:4696`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run=ui.currentMission`
- **Chamadas internas detectadas:** `r31MissionBranches`, `r31OpportunityFromBranch`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00666 — `r31ResolveTrainingOpportunity`

- **Fonte:** `app.js:4697`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `detail={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00667 — `r31ResolveMentorOpportunity`

- **Fonte:** `app.js:4702`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mentorId,detail={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00668 — `r31DiscoverMentorForOpportunity`

- **Fonte:** `app.js:4707`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `o`
- **Chamadas internas detectadas:** `v83EnsureState`, `v83Hash`, `r31Clock`, `r31Commit`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00669 — `r31ResolveOpportunity`

- **Fonte:** `app.js:4708`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r31Ensure`, `toast`, `r31Commit`, `render`, `v83EnsureState`, `r31DiscoverMentorForOpportunity`, `missionById`, `startBattle`, `r25Duo`, `v81IsLeon`, `v83SkillValue`, `skillTotal`, `r31Clock`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00670 — `r31MentorTechniqueCandidates`

- **Fonte:** `app.js:4715`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mentorId`
- **Chamadas internas detectadas:** `test`, `r31MentorFor`, `r31HasOwned`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00671 — `r31MentorSession`

- **Fonte:** `app.js:4716`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mentorId`
- **Chamadas internas detectadas:** `v83EnsureState`, `toast`, `r27TrainingGate`, `r27TrainingBlock`, `v82TrainingRoll`, `r31MentorTechniqueCandidates`, `r31TechniqueAccess`, `test`, `r31Ensure`, `r31Clock`, `r31Commit`, `r27RecordTraining`, `r31ResolveMentorOpportunity`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00672 — `r31Semantic`

- **Fonte:** `app.js:4752`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `map,object`
- **Chamadas internas detectadas:** `r31Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00673 — `r31UniqueAssets`

- **Fonte:** `app.js:4753`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `...sources`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00674 — `r31PickVisualPool`

- **Fonte:** `app.js:4770`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,key='',offset=0`
- **Chamadas internas detectadas:** `r29Hash`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00675 — `r31VariantContext`

- **Fonte:** `app.js:4771`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id=''`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00676 — `r31TechniqueArt`

- **Fonte:** `app.js:4772`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00677 — `r31ItemArt`

- **Fonte:** `app.js:4773`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `i`
- **Chamadas internas detectadas:** `r31GeneratedItemPool`, `r29Hash`, `r31VariantContext`, `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00678 — `r31NpcArt`

- **Fonte:** `app.js:4774`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,index=0`
- **Chamadas internas detectadas:** `r31Norm`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00679 — `r31EnemyArt`

- **Fonte:** `app.js:4775`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00680 — `r31MissionArt`

- **Fonte:** `app.js:4776`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00681 — `r31VendorArt`

- **Fonte:** `app.js:4777`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00682 — `r31TechniqueStatusLabel`

- **Fonte:** `app.js:4787`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00683 — `r31TechniqueCard`

- **Fonte:** `app.js:4788`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `j,d,mode`
- **Chamadas internas detectadas:** `r31TechniqueDamageProfile`, `esc`, `r31TechniqueArt`, `r31TechniqueStatusLabel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `v82-use-outside`, `v82-train-tech`
- **Status:** `STATICALLY_TRACED`

## FUNC-00684 — `r31PartyDef`

- **Fonte:** `app.js:4796`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00685 — `r31PartyHtml`

- **Fonte:** `app.js:4797`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `activeBattle=false`
- **Chamadas internas detectadas:** `v81IsLeon`, `r31Ensure`, `esc`, `r31NpcArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r31-party-action`, `r31-party-toggle`
- **Status:** `STATICALLY_TRACED`

## FUNC-00686 — `r31PartyToggle`

- **Fonte:** `app.js:4798`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r31Ensure`, `toast`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00687 — `r31RandomBattle`

- **Fonte:** `app.js:4799`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `v81IsLeon`, `toast`, `test`, `v83ClockAbsolute`, `v83EnsureState`, `startBattle`, `r31EnemyArt`, `r27SetBattleOpponents`, `r31Ensure`, `r31Commit`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00688 — `r31PartyAction`

- **Fonte:** `app.js:4800`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r31PartyDef`, `toast`, `battleLog`, `finishBattle`, `r31Commit`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00689 — `r31BattlefieldArt`

- **Fonte:** `app.js:4806`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00690 — `r31BoardHtml`

- **Fonte:** `app.js:4807`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `b,action='tactical-move'`
- **Chamadas internas detectadas:** `r27BattleDims`, `r27ActiveEnemies`, `r31NpcArt`, `gridDistance`, `add`, `esc`, `r31BattlefieldArt`, `r31EnemyArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `${action}`
- **Status:** `STATICALLY_TRACED`

## FUNC-00691 — `r31AptitudeArt`

- **Fonte:** `app.js:4823`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00692 — `r31SkillArt`

- **Fonte:** `app.js:4824`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `sk`
- **Chamadas internas detectadas:** `r31Semantic`, `r31PickVisualPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00693 — `r31ResourceArt`

- **Fonte:** `app.js:4826`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `key`
- **Chamadas internas detectadas:** `r31Norm`, `r29Hash`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00694 — `r31VisualCoverage`

- **Fonte:** `app.js:4861`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r31TechniqueArt`, `allItems`, `r31ItemArt`, `r31NpcArt`, `r31MissionArt`, `r31EnemyArt`, `r31VendorArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00695 — `r31PlaceholderPolicy`

- **Fonte:** `app.js:4864`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r31GeneratedItemPool`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00696 — `r31StaticAcceptance`

- **Fonte:** `app.js:4865`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r31VisualCoverage`, `r31PlaceholderPolicy`, `itemById`, `r31Ensure`, `r27BattleDims`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00697 — `r31QaEnter`

- **Fonte:** `app.js:4868`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `defaultState`, `ensureV7State`, `r31Ensure`, `render`, `r31StaticAcceptance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00698 — `r31QaAcceptance`

- **Fonte:** `app.js:4871`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r31StaticAcceptance`, `r31TechniqueAccess`, `r31Ensure`, `r31BoardHtml`, `r31Clock`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00699 — `r31Asset`

- **Fonte:** `app.js:4883`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `category,objOrKey`
- **Chamadas internas detectadas:** `r31Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00700 — `r31InstallVisualMaps`

- **Fonte:** `app.js:4889`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `bind`, `r31Asset`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00701 — `bind`

- **Fonte:** `app.js:4890`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `cat,mapName`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00702 — `test`

- **Fonte:** `app.js:4918`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `cat`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00703 — `r31DecorateUI`

- **Fonte:** `app.js:4978`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r31Asset`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `account-new`
- **Status:** `STATICALLY_TRACED`

## FUNC-00704 — `r32Clone`

- **Fonte:** `app.js:5002`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00705 — `r32MissionRuntime`

- **Fonte:** `app.js:5003`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00706 — `r32ActiveAssignment`

- **Fonte:** `app.js:5011`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r29Ensure`, `missionById`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00707 — `r32PersistMissionRuntime`

- **Fonte:** `app.js:5023`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r32MissionRuntime`, `r32Clone`, `r29Assignment`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00708 — `r32RestoreMissionRuntime`

- **Fonte:** `app.js:5035`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r32MissionRuntime`, `missionById`, `r32Clone`, `r29Assignment`, `r32ActiveAssignment`, `r32PersistMissionRuntime`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00709 — `r32ActiveMission`

- **Fonte:** `app.js:5057`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r32RestoreMissionRuntime`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00710 — `r32MissionDependencyIds`

- **Fonte:** `app.js:5058`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `r29Assignment`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00711 — `r32MissionContinuityGate`

- **Fonte:** `app.js:5064`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** `r32ActiveMission`, `missionById`, `r32MissionDependencyIds`, `r29Assignment`, `r29Ensure`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00712 — `r33Script`

- **Fonte:** `app.js:5192`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00713 — `r33Bonus`

- **Fonte:** `app.js:5195`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `choice`
- **Chamadas internas detectadas:** `v81IsLeon`, `v83SkillValue`, `skillTotal`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00714 — `r33CD`

- **Fonte:** `app.js:5196`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `script,stage,choice,run`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00715 — `r33Chance`

- **Fonte:** `app.js:5197`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `bonus,cd`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00716 — `r33Outcome`

- **Fonte:** `app.js:5198`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `roll,total,cd`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00717 — `add`

- **Fonte:** `app.js:5199`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `field,delta,min,max,label`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00718 — `r33ApplyEffects`

- **Fonte:** `app.js:5199`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `effects={},outcome,run,mission,choice`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00719 — `r33EnsureRun`

- **Fonte:** `app.js:5200`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,script`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00720 — `r33Stage`

- **Fonte:** `app.js:5201`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,m`
- **Chamadas internas detectadas:** `r33Script`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00721 — `r33ChoiceMeta`

- **Fonte:** `app.js:5202`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `choice,script,stage,run`
- **Chamadas internas detectadas:** `r33Bonus`, `r33CD`, `r33Chance`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00722 — `r33EffectSummary`

- **Fonte:** `app.js:5203`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e={},success=true`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00723 — `r33MissionHeader`

- **Fonte:** `app.js:5204`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m,script,run`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00724 — `r33ChoiceCard`

- **Fonte:** `app.js:5205`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `choice,script,stage,run,i`
- **Chamadas internas detectadas:** `r33ChoiceMeta`, `esc`, `r33EffectSummary`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `mission-choice`
- **Status:** `STATICALLY_TRACED`

## FUNC-00725 — `r33RenderActiveMission`

- **Fonte:** `app.js:5206`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `render`, `missionById`, `r33Script`, `esc`, `r33EnsureRun`, `r33Stage`, `r29Assignment`, `v83ClockLabel`, `r33MissionHeader`, `r33ChoiceCard`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `abandon-mission`, `narrate-mission`
- **Status:** `STATICALLY_TRACED`

## FUNC-00726 — `r33LocalOpponent`

- **Fonte:** `app.js:5210`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `m,script`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00727 — `r33StartLocalCombat`

- **Fonte:** `app.js:5211`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `run,m,script,choice`
- **Chamadas internas detectadas:** `v81IsLeon`, `v8StartLeonBattle`, `startBattle`, `r33LocalOpponent`, `r27SetBattleOpponents`, `battleLog`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00728 — `r35MissionError`

- **Fonte:** `app.js:5248`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `err`
- **Chamadas internas detectadas:** `esc`, `toast`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00729 — `r34RecordClientError`

- **Fonte:** `app.js:5300`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,msg,src,line,col`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00730 — `r382ContentType`

- **Fonte:** `app.js:5318`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00731 — `r382TrueMissions`

- **Fonte:** `app.js:5319`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r382ContentType`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00732 — `r382Tasks`

- **Fonte:** `app.js:5320`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r382ContentType`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00733 — `r382Events`

- **Fonte:** `app.js:5321`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00734 — `r382Script`

- **Fonte:** `app.js:5322`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00735 — `r382Mode`

- **Fonte:** `app.js:5323`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r382Script`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00736 — `r382ModeLabel`

- **Fonte:** `app.js:5324`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `mode`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00737 — `r382CampaignForArc`

- **Fonte:** `app.js:5325`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `arcId`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00738 — `r382ArcById`

- **Fonte:** `app.js:5326`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00739 — `r382NarrativeState`

- **Fonte:** `app.js:5327`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00740 — `r382RemoveLegacyCanonPseudoMissions`

- **Fonte:** `app.js:5329`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00741 — `r382Words`

- **Fonte:** `app.js:5339`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00742 — `r382ArcMissionScore`

- **Fonte:** `app.js:5340`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `arc,m`
- **Chamadas internas detectadas:** `r382Words`, `r382Script`, `v75Norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00743 — `r382ArcMissionCandidate`

- **Fonte:** `app.js:5341`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `arc`
- **Chamadas internas detectadas:** `r382TrueMissions`, `r382ArcMissionScore`, `r29Hash`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00744 — `card`

- **Fonte:** `app.js:5362`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `{a,m}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00745 — `r382RenderNarrativeHub`

- **Fonte:** `app.js:5368`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r382NarrativeState`, `r27CanonEnsure`, `r29ActiveCanonEvent`, `r382ArcById`, `r382CampaignForArc`, `r382Events`, `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `r382-narrate-arc`, `r382-select-arc`
- **Status:** `STATICALLY_TRACED`

## FUNC-00746 — `done`

- **Fonte:** `app.js:5377`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `callAI`, `aiGameContext`, `r29ActiveCanonEvent`, `v83ClockLabel`, `v83EnsureState`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00747 — `r382NarrateArc`

- **Fonte:** `app.js:5377`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r382NarrativeState`, `r27CanonEnsure`, `r382ArcById`, `r382CampaignForArc`, `toast`, `test`, `saveState`, `render`, `done`, `callAI`, `aiGameContext`, `r29ActiveCanonEvent`, `v83ClockLabel`, `v83EnsureState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00748 — `r382MissionFreeAction`

- **Fonte:** `app.js:5383`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `missionById`, `r382Script`, `toast`, `render`, `callAI`, `aiGameContext`, `r382NarrativeState`, `saveState`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `r382-mission-free-action`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00749 — `r41Clone`

- **Fonte:** `app.js:5407`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00750 — `r41Slug`

- **Fonte:** `app.js:5408`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00751 — `r41AbsMinute`

- **Fonte:** `app.js:5409`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00752 — `r41Ensure`

- **Fonte:** `app.js:5410`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `test`, `r41Slug`, `ensureLeonKuraiV74`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00753 — `r41ActiveInjuries`

- **Fonte:** `app.js:5437`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00754 — `r41PersistentRecoveryCap`

- **Fonte:** `app.js:5438`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c`
- **Chamadas internas detectadas:** `r41ActiveInjuries`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00755 — `r41Log`

- **Fonte:** `app.js:5439`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `kind,detail={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00756 — `r41CloudFlush`

- **Fonte:** `app.js:5442`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountToken`, `r41ScheduleCloudSave`, `r41Ensure`, `leonSave`, `cloudSave`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00757 — `r41ScheduleCloudSave`

- **Fonte:** `app.js:5452`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `accountToken`, `r41Ensure`, `r41CloudFlush`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00758 — `r41HospitalPlan`

- **Fonte:** `app.js:5501`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r41ActiveInjuries`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00759 — `r41HospitalTreat`

- **Fonte:** `app.js:5504`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `cost,minutes`
- **Chamadas internas detectadas:** `r41HospitalPlan`, `toast`, `r41PersistentRecoveryCap`, `test`, `r41ActiveInjuries`, `r41Clone`, `r41Log`, `saveState`, `closeModal`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00760 — `r41GameForText`

- **Fonte:** `app.js:5512`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `text=''`
- **Chamadas internas detectadas:** `r41Slug`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00761 — `r41RecordMinigame`

- **Fonte:** `app.js:5513`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,result,context={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00762 — `r41OpenMinigame`

- **Fonte:** `app.js:5514`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,context={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00763 — `finish`

- **Fonte:** `app.js:5517`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `clamp`, `r41RecordMinigame`, `r41BroadcastGameplay`, `resolve`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00764 — `frame`

- **Fonte:** `app.js:5518`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `title,body,buttons=''`
- **Chamadas internas detectadas:** `esc`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00765 — `nextTiming`

- **Fonte:** `app.js:5519`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `stabilize=false`
- **Chamadas internas detectadas:** `finish`, `frame`, `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00766 — `tick`

- **Fonte:** `app.js:5519`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `clamp`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00767 — `nextTargets`

- **Fonte:** `app.js:5520`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00768 — `nextSequence`

- **Fonte:** `app.js:5522`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00769 — `nextReaction`

- **Fonte:** `app.js:5523`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00770 — `nextOdd`

- **Fonte:** `app.js:5524`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00771 — `nextStealth`

- **Fonte:** `app.js:5525`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00772 — `nextWave`

- **Fonte:** `app.js:5526`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00773 — `nextMerge`

- **Fonte:** `app.js:5527`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `finish`, `frame`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00774 — `next`

- **Fonte:** `app.js:5528`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `nextTiming`, `nextTargets`, `nextSequence`, `nextReaction`, `nextOdd`, `nextMerge`, `nextWave`, `nextStealth`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00775 — `handler`

- **Fonte:** `app.js:5529`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `next`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `r41-seq-input`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00776 — `r41ExactVisual`

- **Fonte:** `app.js:5570`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `type,id`
- **Chamadas internas detectadas:** `r41Slug`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00777 — `r41Appearance`

- **Fonte:** `app.js:5583`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c=state.character`
- **Chamadas internas detectadas:** `r41Clone`, `r41ActiveInjuries`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00778 — `r41SetVisualState`

- **Fonte:** `app.js:5584`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `patch={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00779 — `r41AvatarComposite`

- **Fonte:** `app.js:5585`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `c=state.character`
- **Chamadas internas detectadas:** `r41Appearance`, `esc`, `itemById`, `v7ItemArt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00780 — `r41DoActivity`

- **Fonte:** `app.js:5592`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `r41Ensure`, `toast`, `r41OpenMinigame`, `rollLeon2d10`, `rollTerion2d10`, `skillTotal`, `r41AbsMinute`, `r41BroadcastGameplay`, `saveState`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00781 — `r41OnlineAction`

- **Fonte:** `app.js:5598`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00782 — `r41OnlineRefresh`

- **Fonte:** `app.js:5599`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `ensureOnlineState`, `onlinePost`, `r41Ensure`, `warn`
- **Rotas referidas:** `/api/online/state`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00783 — `r41SendOnlineIntent`

- **Fonte:** `app.js:5600`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `toast`, `r41OnlineAction`, `r41OnlineRefresh`, `render`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** `r41-online-intent`
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00784 — `r41BroadcastGameplay`

- **Fonte:** `app.js:5605`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00785 — `r41CombatSnapshot`

- **Fonte:** `app.js:5610`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `r41Clone`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00786 — `r41CombatVisual`

- **Fonte:** `app.js:5611`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result={},technique={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00787 — `r41PresentDiff`

- **Fonte:** `app.js:5616`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `before,after,label,technique={},target='enemy'`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00788 — `safeEqual`

- **Fonte:** `cloudflare/r41-api/src/entry.js:7`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00789 — `cors`

- **Fonte:** `cloudflare/r41-api/src/entry.js:8`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `ALLOWED_ORIGINS`, `ALLOWED_ORIGIN`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00790 — `json`

- **Fonte:** `cloudflare/r41-api/src/entry.js:9`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,status,body`
- **Chamadas internas detectadas:** `cors`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00791 — `fingerprint`

- **Fonte:** `cloudflare/r41-api/src/entry.js:10`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00792 — `guardDb`

- **Fonte:** `cloudflare/r41-api/src/entry.js:11`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** `room_memberships`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `MONGODB_URI`, `MONGODB_DB`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00793 — `currentAccount`

- **Fonte:** `cloudflare/r41-api/src/entry.js:12`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,ctx`
- **Chamadas internas detectadas:** `fetch`, `json`
- **Rotas referidas:** `/api/auth/me`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00794 — `rememberMembership`

- **Fonte:** `cloudflare/r41-api/src/entry.js:13`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,roomId,userId,mode,role="member"`
- **Chamadas internas detectadas:** `guardDb`
- **Rotas referidas:** —
- **Coleções MongoDB:** `room_memberships`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00795 — `hasMembership`

- **Fonte:** `cloudflare/r41-api/src/entry.js:14`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,roomId,userId`
- **Chamadas internas detectadas:** `guardDb`
- **Rotas referidas:** —
- **Coleções MongoDB:** `room_memberships`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00796 — `touchMembership`

- **Fonte:** `cloudflare/r41-api/src/entry.js:15`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,roomId,userId`
- **Chamadas internas detectadas:** `guardDb`
- **Rotas referidas:** —
- **Coleções MongoDB:** `room_memberships`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00797 — `mechanicalClaim`

- **Fonte:** `cloudflare/r41-api/src/entry.js:17`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value,depth=0`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00798 — `actionType`

- **Fonte:** `cloudflare/r41-api/src/entry.js:18`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00799 — `actionLooksLikeOutcome`

- **Fonte:** `cloudflare/r41-api/src/entry.js:19`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `actionType`, `mechanicalClaim`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00800 — `guardedOnline`

- **Fonte:** `cloudflare/r41-api/src/entry.js:20`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,ctx,path`
- **Chamadas internas detectadas:** `currentAccount`, `json`, `clone`, `fetch`, `rememberMembership`, `guardDb`, `hasMembership`, `actionLooksLikeOutcome`, `touchMembership`
- **Rotas referidas:** —
- **Coleções MongoDB:** `room_memberships`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00801 — `claimLeon`

- **Fonte:** `cloudflare/r41-api/src/entry.js:31`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,ctx`
- **Chamadas internas detectadas:** `json`, `clone`, `safeEqual`, `currentAccount`, `guardDb`, `fingerprint`
- **Rotas referidas:** —
- **Coleções MongoDB:** `private_claims`, `users`, `audit_events`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `LEON_PRIVATE_CODE`, `MONGODB_URI`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00802 — `aiRoute`

- **Fonte:** `cloudflare/r41-api/src/entry.js:34`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env`
- **Chamadas internas detectadas:** `json`, `clone`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `AI`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00803 — `statusRoute`

- **Fonte:** `cloudflare/r41-api/src/entry.js:35`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,ctx`
- **Chamadas internas detectadas:** `fetch`, `clone`, `json`, `cors`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `AI`, `LEON_PRIVATE_CODE`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00804 — `mapWorldTick`

- **Fonte:** `cloudflare/r41-api/src/entry.js:36`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req`
- **Chamadas internas detectadas:** `clone`, `json`
- **Rotas referidas:** `/api/v84/world/tick`, `/api/v84/world/event`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00805 — `b64url`

- **Fonte:** `cloudflare/r41-api/src/index.js:13`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `bytes`
- **Chamadas internas detectadas:** `unb64url`, `hmac`, `timingSafe`, `hashPassword`, `randomBytes`, `randomSecret`, `norm`, `cleanText`, `bearer`, `get`, `test`, `plainId`, `safeAccount`, `cors`, `reply`, `bodyJson`, `json`, `toObjectId`, `nowIso`, `roomId`, `mongo`, `ensureIndexes`, `issueToken`, `verifyToken`, `requireUser`, `revokeCurrent`, `slotSummary`, `clampSaveForStorage`, `audit`, `constructor`, `read`, `write`, `liveMembers`, `fetch`, `roomCall`, `roomJson`, `aiRoute`
- **Rotas referidas:** `/api/status`, `/api/auth/register`, `/api/auth/login`, `/api/auth/recover`, `/api/ai`, `/api/v84/bootstrap`, `/api/auth/me`, `/api/auth/logout`, `/api/account/slots`, `/api/account/save`, `/api/account/load`, `/api/account/delete`, `/api/cloud/load`, `/api/private/unlock`, `/api/private/leon/load`, `/api/private/leon/save`, `/api/leaderboard`, `/api/friends`, `/api/friends/add`, `/api/online/create`, `/api/online/join`, `/api/online/heartbeat`, `/api/online/room`, `/api/online/message`, `/api/online/messages`, `/api/online/action`, `/api/online/state`, `/api/v84/world/event`, `/api/v84/world/savepoint`
- **Coleções MongoDB:** `users`, `sessions`, `saves`, `friends`, `room_registry`, `world_events`, `world_state`, `audit_events`, `recovery_codes`
- **Modelos IA:** `@cf/meta/llama-3.2-1b-instruct`
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `ALLOWED_ORIGINS`, `ALLOWED_ORIGIN`, `MONGODB_URI`, `MONGODB_DB`, `AUTH_SECRET`, `GAME_ROOMS`, `AI`, `LEON_PRIVATE_CODE`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00806 — `unb64url`

- **Fonte:** `cloudflare/r41-api/src/index.js:14`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00807 — `hmac`

- **Fonte:** `cloudflare/r41-api/src/index.js:15`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `secret,data`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00808 — `timingSafe`

- **Fonte:** `cloudflare/r41-api/src/index.js:16`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `a,b`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00809 — `hashPassword`

- **Fonte:** `cloudflare/r41-api/src/index.js:17`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `password,salt,iterations=210000`
- **Chamadas internas detectadas:** `b64url`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00810 — `randomBytes`

- **Fonte:** `cloudflare/r41-api/src/index.js:18`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n=16`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00811 — `randomSecret`

- **Fonte:** `cloudflare/r41-api/src/index.js:19`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n=24`
- **Chamadas internas detectadas:** `b64url`, `randomBytes`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00812 — `norm`

- **Fonte:** `cloudflare/r41-api/src/index.js:20`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00813 — `cleanText`

- **Fonte:** `cloudflare/r41-api/src/index.js:21`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v,max=120`
- **Chamadas internas detectadas:** `norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00814 — `bearer`

- **Fonte:** `cloudflare/r41-api/src/index.js:22`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req`
- **Chamadas internas detectadas:** `get`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00815 — `plainId`

- **Fonte:** `cloudflare/r41-api/src/index.js:23`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00816 — `safeAccount`

- **Fonte:** `cloudflare/r41-api/src/index.js:24`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `u`
- **Chamadas internas detectadas:** `plainId`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00817 — `cors`

- **Fonte:** `cloudflare/r41-api/src/index.js:25`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `ALLOWED_ORIGINS`, `ALLOWED_ORIGIN`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00818 — `reply`

- **Fonte:** `cloudflare/r41-api/src/index.js:26`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,status,body,extra={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00819 — `bodyJson`

- **Fonte:** `cloudflare/r41-api/src/index.js:27`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req`
- **Chamadas internas detectadas:** `json`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00820 — `toObjectId`

- **Fonte:** `cloudflare/r41-api/src/index.js:28`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00821 — `nowIso`

- **Fonte:** `cloudflare/r41-api/src/index.js:29`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00822 — `roomId`

- **Fonte:** `cloudflare/r41-api/src/index.js:30`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00823 — `mongo`

- **Fonte:** `cloudflare/r41-api/src/index.js:32`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `MONGODB_URI`, `MONGODB_DB`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00824 — `ensureIndexes`

- **Fonte:** `cloudflare/r41-api/src/index.js:37`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `db`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** `users`, `sessions`, `saves`, `friends`, `room_registry`, `world_events`, `world_state`, `audit_events`, `recovery_codes`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00825 — `issueToken`

- **Fonte:** `cloudflare/r41-api/src/index.js:54`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,db,user`
- **Chamadas internas detectadas:** `b64url`, `plainId`, `hmac`
- **Rotas referidas:** —
- **Coleções MongoDB:** `sessions`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `AUTH_SECRET`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00826 — `verifyToken`

- **Fonte:** `cloudflare/r41-api/src/index.js:55`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,db,token`
- **Chamadas internas detectadas:** `b64url`, `hmac`, `timingSafe`, `unb64url`, `toObjectId`
- **Rotas referidas:** —
- **Coleções MongoDB:** `sessions`, `users`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `AUTH_SECRET`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00827 — `requireUser`

- **Fonte:** `cloudflare/r41-api/src/index.js:56`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,db`
- **Chamadas internas detectadas:** `verifyToken`, `bearer`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00828 — `revokeCurrent`

- **Fonte:** `cloudflare/r41-api/src/index.js:57`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env,db`
- **Chamadas internas detectadas:** `bearer`, `unb64url`
- **Rotas referidas:** —
- **Coleções MongoDB:** `sessions`
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00829 — `slotSummary`

- **Fonte:** `cloudflare/r41-api/src/index.js:58`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00830 — `clampSaveForStorage`

- **Fonte:** `cloudflare/r41-api/src/index.js:59`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `save`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00831 — `audit`

- **Fonte:** `cloudflare/r41-api/src/index.js:60`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `db,type,userId,detail={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00832 — `constructor`

- **Fonte:** `cloudflare/r41-api/src/index.js:63`
- **Domínio:** `game-runtime`
- **Forma:** method
- **Parâmetros:** `ctx,env`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00833 — `read`

- **Fonte:** `cloudflare/r41-api/src/index.js:64`
- **Domínio:** `game-runtime`
- **Forma:** method
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00834 — `write`

- **Fonte:** `cloudflare/r41-api/src/index.js:65`
- **Domínio:** `game-runtime`
- **Forma:** method
- **Parâmetros:** `room`
- **Chamadas internas detectadas:** `nowIso`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00835 — `liveMembers`

- **Fonte:** `cloudflare/r41-api/src/index.js:66`
- **Domínio:** `game-runtime`
- **Forma:** method
- **Parâmetros:** `room`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00836 — `fetch`

- **Fonte:** `cloudflare/r41-api/src/index.js:67`
- **Domínio:** `game-runtime`
- **Forma:** method
- **Parâmetros:** `req`
- **Chamadas internas detectadas:** `read`, `json`, `cleanText`, `nowIso`, `write`, `liveMembers`, `get`, `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00837 — `roomCall`

- **Fonte:** `cloudflare/r41-api/src/index.js:81`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,id,action,payload={},method="POST",query=""`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00838 — `roomJson`

- **Fonte:** `cloudflare/r41-api/src/index.js:82`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `env,id,action,payload={},query=""`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00839 — `aiRoute`

- **Fonte:** `cloudflare/r41-api/src/index.js:84`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `req,env`
- **Chamadas internas detectadas:** `reply`, `bodyJson`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** `@cf/meta/llama-3.2-1b-instruct`
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** `AI`
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00840 — `trainer`

- **Fonte:** `data/v84-integrated-config.js:4`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `id, name, specialties, location, image, extra = {}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00841 — `apiOrigin`

- **Fonte:** `r41-github-api.js:6`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** `sns-r41-api-origin`
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00842 — `token`

- **Fonte:** `r41-github-api.js:7`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** `sns-v841-auth-token`
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00843 — `captureClaim`

- **Fonte:** `r41-github-api.js:8`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00844 — `mapTarget`

- **Fonte:** `r41-github-api.js:15`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `raw`
- **Chamadas internas detectadas:** `apiOrigin`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00845 — `withAuth`

- **Fonte:** `r41-github-api.js:24`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `init,api`
- **Chamadas internas detectadas:** `token`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00846 — `applyLeonClaim`

- **Fonte:** `r41-github-api.js:33`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `response,mapped`
- **Chamadas internas detectadas:** `clone`, `json`, `apiOrigin`
- **Rotas referidas:** `/api/auth/login`, `/api/auth/register`, `/api/private/claim-leon`
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00847 — `slug`

- **Fonte:** `src/r41-canonical-repair.js:28`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00848 — `normalize`

- **Fonte:** `src/r41-core-bundle.js:5`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `fetch`, `json`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00849 — `getJson`

- **Fonte:** `src/r41-core-bundle.js:6`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `url`
- **Chamadas internas detectadas:** `fetch`, `json`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00850 — `indexManifest`

- **Fonte:** `src/r41-core-bundle.js:7`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `manifest`
- **Chamadas internas detectadas:** `normalize`, `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00851 — `init`

- **Fonte:** `src/r41-core-bundle.js:14`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `getJson`, `indexManifest`, `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00852 — `resolve`

- **Fonte:** `src/r41-core-bundle.js:25`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `request`
- **Chamadas internas detectadas:** `normalize`, `get`, `warn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00853 — `auditKnown`

- **Fonte:** `src/r41-core-bundle.js:42`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00854 — `normalize`

- **Fonte:** `src/r41-core-bundle.js:51`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00855 — `fromCombatResult`

- **Fonte:** `src/r41-core-bundle.js:52`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00856 — `validateEvent`

- **Fonte:** `src/r41-core-bundle.js:63`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `e`
- **Chamadas internas detectadas:** `normalize`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00857 — `clone`

- **Fonte:** `src/r41-core-bundle.js:70`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00858 — `ensure`

- **Fonte:** `src/r41-core-bundle.js:71`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `character={},equipment={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00859 — `apply`

- **Fonte:** `src/r41-core-bundle.js:72`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `character,equipment,patch={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00860 — `validate`

- **Fonte:** `src/r41-core-bundle.js:73`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `character,equipment={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00861 — `fromResult`

- **Fonte:** `src/r41-core-bundle.js:78`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00862 — `validate`

- **Fonte:** `src/r41-core-bundle.js:79`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result={},events=[]`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00863 — `norm`

- **Fonte:** `src/r41-core-bundle.js:84`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00864 — `kindOf`

- **Fonte:** `src/r41-core-bundle.js:85`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `action={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00865 — `apply`

- **Fonte:** `src/r41-core-bundle.js:86`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `character,action={},mechanicalResult={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00866 — `validate`

- **Fonte:** `src/r41-core-bundle.js:87`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `state={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00867 — `norm`

- **Fonte:** `src/r41-core-bundle.js:94`
- **Domínio:** `game-runtime`
- **Forma:** arrow-one
- **Parâmetros:** `v`
- **Chamadas internas detectadas:** `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00868 — `register`

- **Fonte:** `src/r41-core-bundle.js:95`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id,def`
- **Chamadas internas detectadas:** `norm`, `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00869 — `get`

- **Fonte:** `src/r41-core-bundle.js:96`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `id`
- **Chamadas internas detectadas:** `norm`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00870 — `infer`

- **Fonte:** `src/r41-core-bundle.js:97`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `technique={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00871 — `clamp`

- **Fonte:** `src/r41-core-bundle.js:115`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `n,min,max`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00872 — `normalizeResult`

- **Fonte:** `src/r41-core-bundle.js:116`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `input={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00873 — `terionModifier`

- **Fonte:** `src/r41-core-bundle.js:120`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `result`
- **Chamadas internas detectadas:** `normalizeResult`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00874 — `trainingResult`

- **Fonte:** `src/r41-core-bundle.js:126`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `input={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00875 — `normalizeScene`

- **Fonte:** `src/r41-core-bundle.js:137`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `input={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00876 — `fromMissionStage`

- **Fonte:** `src/r41-core-bundle.js:141`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `stage={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00877 — `shouldSave`

- **Fonte:** `src/r41-core-bundle.js:149`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `change={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00878 — `record`

- **Fonte:** `src/r41-core-bundle.js:150`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `reason,payload={}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00879 — `boot`

- **Fonte:** `src/r41-core-bundle.js:160`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00880 — `repair`

- **Fonte:** `src/r41-final-ui-repair.js:12`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `root=document.body`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00881 — `schedule`

- **Fonte:** `src/r41-final-ui-repair.js:19`
- **Domínio:** `game-runtime`
- **Forma:** arrow
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `repair`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00882 — `localProgressKeys`

- **Fonte:** `src/r41-local-reset-fix.js:20`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00883 — `resetLocalProgress`

- **Fonte:** `src/r41-local-reset-fix.js:30`
- **Domínio:** `game-runtime`
- **Forma:** declaration
- **Parâmetros:** `(nenhum explícito)`
- **Chamadas internas detectadas:** `localProgressKeys`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00884 — `fail`

- **Fonte:** `tools/audit-documentation-coverage.mjs:10`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00885 — `warn`

- **Fonte:** `tools/audit-documentation-coverage.mjs:11`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `x`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00886 — `exists`

- **Fonte:** `tools/audit-documentation-coverage.mjs:12`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00887 — `norm`

- **Fonte:** `tools/audit-documentation-coverage.mjs:13`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00888 — `isDoc`

- **Fonte:** `tools/audit-documentation-coverage.mjs:14`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00889 — `isTooling`

- **Fonte:** `tools/audit-documentation-coverage.mjs:15`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00890 — `isGameRuntime`

- **Fonte:** `tools/audit-documentation-coverage.mjs:16`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00891 — `auditGameGrouped`

- **Fonte:** `tools/audit-documentation-coverage.mjs:77`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `items,label`
- **Chamadas internas detectadas:** `fail`, `isGameRuntime`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00892 — `sha256`

- **Fonte:** `tools/audit-final-canonical-spec.mjs:10`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `d`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00893 — `walk`

- **Fonte:** `tools/audit-r41-assets.mjs:17`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `dir, files=[]`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00894 — `cleanRef`

- **Fonte:** `tools/audit-r41-assets.mjs:26`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `ref`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00895 — `isDynamic`

- **Fonte:** `tools/audit-r41-assets.mjs:31`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `ref`
- **Chamadas internas detectadas:** `test`, `addRef`, `cleanRef`, `get`, `walk`, `warn`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00896 — `addRef`

- **Fonte:** `tools/audit-r41-assets.mjs:32`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `map,ref,source`
- **Chamadas internas detectadas:** `cleanRef`, `isDynamic`, `get`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00897 — `assert`

- **Fonte:** `tools/browser-live-api.mjs:13`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `cond, msg`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00898 — `fail`

- **Fonte:** `tools/browser-smoke.mjs:12`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `message`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00899 — `assert`

- **Fonte:** `tools/browser-smoke.mjs:13`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `condition, message`
- **Chamadas internas detectadas:** `fail`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00900 — `sha256`

- **Fonte:** `tools/build-final-canonical-spec.mjs:19`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `data`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00901 — `norm`

- **Fonte:** `tools/build-final-canonical-spec.mjs:20`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00902 — `isDocs`

- **Fonte:** `tools/build-final-canonical-spec.mjs:21`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00903 — `isSource`

- **Fonte:** `tools/build-final-canonical-spec.mjs:22`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00904 — `esc`

- **Fonte:** `tools/build-final-canonical-spec.mjs:23`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00905 — `code`

- **Fonte:** `tools/build-final-canonical-spec.mjs:24`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00906 — `fence`

- **Fonte:** `tools/build-final-canonical-spec.mjs:25`
- **Domínio:** `tooling`
- **Forma:** arrow
- **Parâmetros:** `text, lang='text'`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00907 — `langFor`

- **Fonte:** `tools/build-final-canonical-spec.mjs:26`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00908 — `lineLocator`

- **Fonte:** `tools/build-final-canonical-spec.mjs:31`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00909 — `blockEnd`

- **Fonte:** `tools/build-final-canonical-spec.mjs:41`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text, open`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00910 — `snippetAt`

- **Fonte:** `tools/build-final-canonical-spec.mjs:62`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text, start`
- **Chamadas internas detectadas:** `blockEnd`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00911 — `scanFunctions`

- **Fonte:** `tools/build-final-canonical-spec.mjs:72`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `file, text`
- **Chamadas internas detectadas:** `lineLocator`, `add`, `snippetAt`, `lineAt`, `sha256`, `isSource`, `test`, `get`, `actionHandlerEvidence`, `esc`, `gate`, `code`, `fence`, `langFor`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00912 — `actionHandlerEvidence`

- **Fonte:** `tools/build-final-canonical-spec.mjs:126`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `action`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00913 — `gate`

- **Fonte:** `tools/build-final-canonical-spec.mjs:175`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `list`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00914 — `walk`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:26`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `dir, rel = ''`
- **Chamadas internas detectadas:** `test`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00915 — `reEsc`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:40`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00916 — `lineAt`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:41`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text, index`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00917 — `occurrences`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:46`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text, needle`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00918 — `uniqEvidence`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:55`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `items`
- **Chamadas internas detectadas:** `add`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00919 — `aliasesForDatasetAction`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:65`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00920 — `handlerEvidence`

- **Fonte:** `tools/finalize-canonical-ui-trace.mjs:73`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `reEsc`, `occurrences`, `test`, `lineAt`, `aliasesForDatasetAction`, `uniqEvidence`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** `${value}`
- **Status:** `STATICALLY_TRACED`

## FUNC-00921 — `px`

- **Fonte:** `tools/generate-technical-spec.mjs:13`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00922 — `rel`

- **Fonte:** `tools/generate-technical-spec.mjs:14`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00923 — `code`

- **Fonte:** `tools/generate-technical-spec.mjs:15`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00924 — `clean`

- **Fonte:** `tools/generate-technical-spec.mjs:16`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00925 — `uniq`

- **Fonte:** `tools/generate-technical-spec.mjs:17`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00926 — `ident`

- **Fonte:** `tools/generate-technical-spec.mjs:18`
- **Domínio:** `tooling`
- **Forma:** arrow
- **Parâmetros:** `prefix,n`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00927 — `hash`

- **Fonte:** `tools/generate-technical-spec.mjs:19`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `b`
- **Chamadas internas detectadas:** `rel`, `walk`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00928 — `walk`

- **Fonte:** `tools/generate-technical-spec.mjs:21`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `dir=ROOT,out=[]`
- **Chamadas internas detectadas:** `rel`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00929 — `lineLocator`

- **Fonte:** `tools/generate-technical-spec.mjs:32`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00930 — `readText`

- **Fonte:** `tools/generate-technical-spec.mjs:42`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `file`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00931 — `blockEnd`

- **Fonte:** `tools/generate-technical-spec.mjs:48`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text,open`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00932 — `bodyAt`

- **Fonte:** `tools/generate-technical-spec.mjs:69`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text,start`
- **Chamadas internas detectadas:** `blockEnd`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00933 — `captures`

- **Fonte:** `tools/generate-technical-spec.mjs:75`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text,re,group=1`
- **Chamadas internas detectadas:** `uniq`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00934 — `refs`

- **Fonte:** `tools/generate-technical-spec.mjs:81`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `text`
- **Chamadas internas detectadas:** `captures`, `uniq`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00935 — `extractFunctions`

- **Fonte:** `tools/generate-technical-spec.mjs:99`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `file,text,lineAt`
- **Chamadas internas detectadas:** `add`, `bodyAt`, `lineAt`, `clean`, `refs`, `walk`, `rel`, `hash`, `readText`, `lineLocator`, `test`, `get`, `uniq`, `ident`, `grouped`, `header`, `code`, `sources`, `listCodes`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00936 — `add`

- **Fonte:** `tools/generate-technical-spec.mjs:149`
- **Domínio:** `tooling`
- **Forma:** arrow
- **Parâmetros:** `bucket,re,map`
- **Chamadas internas detectadas:** `lineAt`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00937 — `grouped`

- **Fonte:** `tools/generate-technical-spec.mjs:163`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `list,prefix`
- **Chamadas internas detectadas:** `get`, `ident`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00938 — `header`

- **Fonte:** `tools/generate-technical-spec.mjs:216`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `title,desc`
- **Chamadas internas detectadas:** `code`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00939 — `sources`

- **Fonte:** `tools/generate-technical-spec.mjs:217`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** `code`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00940 — `listCodes`

- **Fonte:** `tools/generate-technical-spec.mjs:218`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00941 — `assert`

- **Fonte:** `tools/live-worker-e2e.mjs:11`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `cond, msg`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00942 — `record`

- **Fonte:** `tools/live-worker-e2e.mjs:14`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `name, value = true`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00943 — `request`

- **Fonte:** `tools/live-worker-e2e.mjs:17`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `route, { method = 'POST', token = '', body, expected = [200] } = {}`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00944 — `safe`

- **Fonte:** `tools/live-worker-e2e.mjs:35`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `obj`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00945 — `writeReport`

- **Fonte:** `tools/live-worker-e2e.mjs:43`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `status, ok`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00946 — `norm`

- **Fonte:** `tools/reconcile-asset-references.mjs:11`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `test`, `isDynamic`, `code`, `get`, `existsLiteral`, `srcs`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00947 — `isDynamic`

- **Fonte:** `tools/reconcile-asset-references.mjs:12`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `norm`, `test`, `code`, `get`, `existsLiteral`, `srcs`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00948 — `existsLiteral`

- **Fonte:** `tools/reconcile-asset-references.mjs:16`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** `norm`, `isDynamic`
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00949 — `code`

- **Fonte:** `tools/reconcile-asset-references.mjs:21`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `value`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00950 — `srcs`

- **Fonte:** `tools/reconcile-asset-references.mjs:22`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `refs`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00951 — `norm`

- **Fonte:** `tools/refine-technical-spec.mjs:13`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00952 — `hasSourceExt`

- **Fonte:** `tools/refine-technical-spec.mjs:14`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00953 — `isDocumentation`

- **Fonte:** `tools/refine-technical-spec.mjs:15`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00954 — `isTooling`

- **Fonte:** `tools/refine-technical-spec.mjs:16`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00955 — `isSource`

- **Fonte:** `tools/refine-technical-spec.mjs:17`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00956 — `isGameRuntimeSource`

- **Fonte:** `tools/refine-technical-spec.mjs:18`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00957 — `domainOf`

- **Fonte:** `tools/refine-technical-spec.mjs:19`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `p`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00958 — `code`

- **Fonte:** `tools/refine-technical-spec.mjs:20`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00959 — `clean`

- **Fonte:** `tools/refine-technical-spec.mjs:21`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `s`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00960 — `srcs`

- **Fonte:** `tools/refine-technical-spec.mjs:22`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00961 — `listCodes`

- **Fonte:** `tools/refine-technical-spec.mjs:23`
- **Domínio:** `tooling`
- **Forma:** arrow-one
- **Parâmetros:** `a`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00962 — `header`

- **Fonte:** `tools/refine-technical-spec.mjs:24`
- **Domínio:** `tooling`
- **Forma:** arrow
- **Parâmetros:** `title,desc`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

## FUNC-00963 — `filterGrouped`

- **Fonte:** `tools/refine-technical-spec.mjs:26`
- **Domínio:** `tooling`
- **Forma:** declaration
- **Parâmetros:** `items,predicate`
- **Chamadas internas detectadas:** —
- **Rotas referidas:** —
- **Coleções MongoDB:** —
- **Modelos IA:** —
- **DOM IDs:** —
- **Storage keys:** —
- **Env:** —
- **Ações UI literais:** —
- **Status:** `STATICALLY_TRACED`

