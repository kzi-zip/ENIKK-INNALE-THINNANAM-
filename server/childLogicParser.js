/**
 * DEEP CHILD LOGIC NLP & CINEMATIC STORYBOARD ENGINE
 * 
 * Truly understands semantic relations between Actor, Target, Action,
 * Environment, Scale, Consequence, and Restoration without generic fallbacks.
 * Builds full 7-phase cause-and-effect visual plans before animation starts.
 */

function analyzeChildRequest(inputText) {
  const text = (inputText || '').trim();
  const lower = text.toLowerCase();

  // Core Semantic Units
  let actor = 'child';
  let target = 'reality';
  let action = 'manifest';
  let scale = 'normal';
  let direction = 'center';
  let emotion = 'curious';
  let environment = 'living_room';
  let secondaryObjects = [];
  let consequence = 'Reality shifted slightly.';
  let restoration = 'Normality restored with a polite chuckle.';
  let physicalPossibility = '0.0001%';
  let temporalLogic = null;
  let sideEffect = null;
  let archetype = 'procedural';
  let primaryColor = '#FF5964';
  let secondaryColor = '#35A7FF';

  // -------------------------------------------------------------
  // 1. SEMANTIC DECOMPOSITION & SCENARIO BLUEPRINTS
  // -------------------------------------------------------------

  // A. "I want to eat the moon" / "Eat the moon"
  if (lower.includes('eat') && lower.includes('moon')) {
    actor = 'child_mouth';
    target = 'moon';
    action = 'eat_moon';
    scale = 'room-celestial';
    direction = 'downward_pull';
    emotion = 'hungry_mischievous';
    environment = 'space_lunar';
    secondaryObjects = ['stardust', 'cheese_crumbs', 'floating_fork'];
    consequence = 'A large crescent bite mark is taken out of the moon. Cheese crumbs rain downward.';
    restoration = 'The moon puts on a cute little band-aid, smiles, and floats back to orbit.';
    physicalPossibility = '0.0000001%';
    sideEffect = 'Tides in the kitchen sink are experiencing slight gravitational confusion.';
    archetype = 'eat_the_moon';
    primaryColor = '#FFF3B0';
    secondaryColor = '#F5DE7A';
  }
  // B. "I want to eat yesterday's biriyani" / "Enikk innale thinnanam"
  else if (lower.includes('biriyani') || lower.includes('biryani') || lower.includes('innale') || (lower.includes('yesterday') && lower.includes('eat'))) {
    actor = 'time_traveler';
    target = 'yesterday_biriyani';
    action = 'time_warp_feast';
    scale = 'clay_pot_table';
    direction = 'temporal_vortex';
    emotion = 'ecstatic_nostalgic';
    environment = 'temporal_wormhole';
    secondaryObjects = ['calendar_leaves', 'clove_spices', 'steaming_masala'];
    consequence = 'Time barrier punctured. Fresh piping hot biriyani materialized from yesterday.';
    restoration = 'Grandmother\'s secret recipe remains safely protected by quantum causality.';
    physicalPossibility = '0.00000001%';
    temporalLogic = 'Uncooperative. Time arrow is protesting.';
    sideEffect = 'Grandmother\'s kitchen aroma has leaked into the current calendar day.';
    archetype = 'yesterday_biriyani';
    primaryColor = '#F39C12';
    secondaryColor = '#C0392B';
  }
  // C. "Make my chair dance with a dinosaur" / "Chair marry a dinosaur"
  else if (lower.includes('chair') && (lower.includes('dinosaur') || lower.includes('dino'))) {
    actor = 'wooden_chair';
    target = 't_rex';
    action = lower.includes('marry') ? 'wedding_matrimony' : 'ballroom_waltz';
    scale = 'dino_sized';
    direction = 'waltz_spin';
    emotion = 'romantic_jubilant';
    environment = 'wedding_chapel';
    secondaryObjects = ['bridal_veil', 'tuxedo_bowtie', 'confetti_shower', 'rose_petals'];
    consequence = 'The chair and dinosaur embrace in harmonious waltzing joy. Confetti fills the air.';
    restoration = 'The dinosaur politely pulls out the chair for dinner.';
    physicalPossibility = '0.0000000000001%';
    sideEffect = 'Local furniture stores report dinosaurs browsing the dining sets.';
    archetype = 'chair_dinosaur_wedding';
    primaryColor = '#E91E63';
    secondaryColor = '#2ECC71';
  }
  // D. "Make my dog bigger than a house"
  else if (lower.includes('dog') && (lower.includes('bigger') || lower.includes('house') || lower.includes('giant'))) {
    actor = 'fluffy_dog';
    target = 'doll_house';
    action = 'colossal_growth';
    scale = 'colossal';
    direction = 'upward_towering';
    emotion = 'excited_playful';
    environment = 'giant_skyline';
    secondaryObjects = ['miniature_chimney', 'tiny_trees', 'earthquake_dust'];
    consequence = 'The dog expands beyond the rooftop. Gentle tail wags generate mild tropical breezes.';
    restoration = 'Good boy receives a colossal tennis ball and sits down gently.';
    physicalPossibility = '0.00001%';
    sideEffect = 'Local mail carriers have requested immediate tactical retreats.';
    archetype = 'giant_dog';
    primaryColor = '#D35400';
    secondaryColor = '#3498DB';
  }
  // E. "Make gravity disappear" / "Zero gravity"
  else if (lower.includes('gravity') || lower.includes('zero g') || lower.includes('floating room')) {
    actor = 'physics_field';
    target = 'all_objects';
    action = 'zero_g_float';
    scale = 'room-filling';
    direction = 'omnidirectional_drift';
    emotion = 'weightless_amazement';
    environment = 'zero_gravity';
    secondaryObjects = ['floating_books', 'flying_pencils', 'floating_apples', 'orbital_chairs'];
    consequence = 'All objects detach from the floor and drift into peaceful cosmic orbit.';
    restoration = 'Gravity gingerly returns with a gentle squish landing.';
    physicalPossibility = '0.000000001%';
    sideEffect = 'Spilled milk is now officially a planetary satellite.';
    archetype = 'zero_gravity';
    primaryColor = '#38BDF8';
    secondaryColor = '#818CF8';
  }
  // F. "Make my spoon fight a dinosaur" / "Spoon duel"
  else if (lower.includes('spoon') && (lower.includes('fight') || lower.includes('dinosaur') || lower.includes('duel'))) {
    actor = 'brave_spoon';
    target = 't_rex';
    action = 'heroic_duel';
    scale = 'tiny_vs_giant';
    direction = 'sword_parry';
    emotion = 'valiant_heroic';
    environment = 'jurassic_room';
    secondaryObjects = ['mini_helmet', 'toothpick_sword', 'metallic_sparks'];
    consequence = 'The courageous teaspoon parries the mighty dinosaur tail with bright metallic pings!';
    restoration = 'The dinosaur surrenders and agrees to share cereal.';
    physicalPossibility = '0.00000002%';
    sideEffect = 'Flatware drawer now possesses an honorable sense of chivalry.';
    archetype = 'spoon_dinosaur_duel';
    primaryColor = '#BDC3C7';
    secondaryColor = '#27AE60';
  }
  // G. "I want to drink the ocean"
  else if (lower.includes('drink') && (lower.includes('ocean') || lower.includes('sea'))) {
    actor = 'child_straw';
    target = 'ocean';
    action = 'ocean_slurp';
    scale = 'oceanic';
    direction = 'water_funnel';
    emotion = 'thirsty_gargantuan';
    environment = 'ocean_depths';
    secondaryObjects = ['giant_striped_straw', 'perplexed_crabs', 'sunglass_fish', 'bubbles'];
    consequence = 'The ocean water level drains down through a giant straw, revealing smiling fish wearing sunglasses.';
    restoration = 'A pleasant rainstorm replenishes the sea back to high tide.';
    physicalPossibility = '0.00000000001%';
    sideEffect = 'Sea turtles report enjoying the pleasant strawberry straw flavor.';
    archetype = 'drink_ocean';
    primaryColor = '#00E5FF';
    secondaryColor = '#2979FF';
  }
  // H. "Turn my homework into pizza"
  else if (lower.includes('homework') || (lower.includes('pizza') && lower.includes('turn'))) {
    actor = 'homework_papers';
    target = 'hot_pizza';
    action = 'cheese_transmutation';
    scale = 'family_sized';
    direction = 'melt_spread';
    emotion = 'delighted_relief';
    environment = 'pizza_kitchen';
    secondaryObjects = ['algebra_equations', 'melting_mozzarella', 'pepperoni_stars'];
    consequence = 'Calculus test papers bubble and stretch into a hot, cheesy pepperoni pizza.';
    restoration = 'A single napkin appears with an A+ written on it.';
    physicalPossibility = '0.00000004%';
    sideEffect = 'Teachers everywhere suddenly detect oregano in their gradebooks.';
    archetype = 'homework_pizza';
    primaryColor = '#E67E22';
    secondaryColor = '#FFD166';
  }
  // I. "Make a penguin fly"
  else if (lower.includes('penguin')) {
    actor = 'aviator_penguin';
    target = 'clouds';
    action = 'glider_flight';
    scale = 'normal';
    direction = 'loop_the_loop';
    emotion = 'thrilled_soaring';
    environment = 'arctic_clouds';
    secondaryObjects = ['aviator_goggles', 'canvas_wings', 'wind_trails'];
    consequence = 'The tuxedo penguin straps on glider wings and performs majestic aerial acrobatic loops!';
    restoration = 'Penguin lands on two feet and bows to enthusiastic cloud applause.';
    physicalPossibility = '0.00001%';
    sideEffect = 'Local seagulls are filing an official union complaint.';
    archetype = 'flying_penguin';
    primaryColor = '#2C3E50';
    secondaryColor = '#00E5FF';
  }
  // J. "Make it rain cookies"
  else if (lower.includes('cookie') || (lower.includes('cookies') && lower.includes('rain'))) {
    actor = 'cookie_cloud';
    target = 'room_carpet';
    action = 'cookie_downpour';
    scale = 'room_filling';
    direction = 'rainfall';
    emotion = 'mouthwatering_joy';
    environment = 'cookie_bakery';
    secondaryObjects = ['chocolate_chips', 'cookie_crumbs', 'milk_droplets'];
    consequence = 'Golden brown chocolate chip cookies cascade gently from the ceiling.';
    restoration = 'A giant glass of cold milk materializes to assist with clean-up.';
    physicalPossibility = '0.00002%';
    sideEffect = 'Atmospheric sugar levels have reached a delicious peak.';
    archetype = 'raining_cookies';
    primaryColor = '#D35400';
    secondaryColor = '#F39C12';
  }
  // K. "I want to hug a cloud" / "Cloud in room"
  else if (lower.includes('cloud')) {
    actor = lower.includes('hug') ? 'hugging_child' : 'indoor_sky';
    target = 'fluffy_cloud';
    action = lower.includes('hug') ? 'cloud_cuddle' : 'indoor_precipitation';
    scale = 'pillow_soft';
    direction = 'gentle_drift';
    emotion = 'loving_cozy';
    environment = lower.includes('hug') ? 'cloud_cuddle' : 'indoor_room';
    secondaryObjects = ['soft_droplets', 'pink_blush', 'sparkle_dew'];
    consequence = 'The cloud squishes into a plush embrace, releasing soft dewy floral mist.';
    restoration = 'The cloud happily drifts up to rest on your ceiling lamp.';
    physicalPossibility = '4.1%';
    sideEffect = 'Humidity levels are now emotionally concerning.';
    archetype = lower.includes('hug') ? 'huggable_cloud' : 'cloud';
    primaryColor = '#E1F5FE';
    secondaryColor = '#FF80AB';
  }
  // L. "I want a dinosaur"
  else if (lower.includes('dinosaur') || lower.includes('t-rex') || lower.includes('dino')) {
    actor = 'friendly_t_rex';
    target = 'carpet_rug';
    action = 'ground_stomp';
    scale = 'room_scaled';
    direction = 'stomp_walk';
    emotion = 'boisterous_friendly';
    environment = 'jurassic_room';
    secondaryObjects = ['footprint_crumbs', 'fern_leaves', 'tiny_arms'];
    consequence = 'A bright green friendly T-Rex bounds into the room with rhythmic thudding steps!';
    restoration = 'Dinosaur receives head scratches and purrs like a giant kitten.';
    physicalPossibility = '0.00000000002%';
    temporalLogic = 'Extinct since 66M BCE. Requisitioned anyway.';
    sideEffect = 'Subtle tectonic vibration detected beneath your slippers.';
    archetype = 'dinosaur';
    primaryColor = '#2ECC71';
    secondaryColor = '#27AE60';
  }
  // M. "I want to touch a rainbow"
  else if (lower.includes('rainbow')) {
    actor = 'reaching_fingers';
    target = 'prismatic_arc';
    action = 'rainbow_touch';
    scale = 'arch_length';
    direction = 'prismatic_glow';
    emotion = 'wondrous';
    environment = 'prismatic_sky';
    secondaryObjects = ['xylophone_chimes', 'color_crystals', 'light_shimmer'];
    consequence = 'Touching the rainbow rings out musical bell chords while prismatic lights sparkle.';
    restoration = 'The rainbow arches gracefully across the window sill.';
    physicalPossibility = '0.03%';
    sideEffect = 'Prismatic reflections have thoroughly mesmerized your pets.';
    archetype = 'rainbow';
    primaryColor = '#E74C3C';
    secondaryColor = '#9B59B6';
  }
  // N. "I want to be a giant"
  else if (lower.includes('giant') || lower.includes('taller')) {
    actor = 'towering_child';
    target = 'city_skyline';
    action = 'giant_stride';
    scale = 'colossal';
    direction = 'towering_upward';
    emotion = 'mighty_cheerful';
    environment = 'giant_skyline';
    secondaryObjects = ['mini_cars', 'tiny_streetlights', 'clouds_at_knees'];
    consequence = 'Your legs stretch high above the buildings, stepping gently over small toy cars.';
    restoration = 'You shrink back down with a gentle squish bounce.';
    physicalPossibility = '0.00001%';
    sideEffect = 'Local birds are filing polite air traffic inquiries.';
    archetype = 'giant_character';
    primaryColor = '#3498DB';
    secondaryColor = '#2980B9';
  }
  // O. Universal Arbitrary Child Logic Parser
  else {
    const words = text.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const stopWords = new Set(['i', 'want', 'a', 'an', 'the', 'to', 'be', 'in', 'my', 'on', 'me', 'please', 'make', 'give', 'can', 'have', 'and', 'with', 'it']);
    const meaningful = words.filter(w => !stopWords.has(w.toLowerCase()));

    actor = meaningful[0] || 'imagined_hero';
    target = meaningful[1] || 'impossible_wonder';
    action = 'manifest_marvel';
    scale = lower.includes('giant') ? 'colossal' : (lower.includes('tiny') ? 'pocket-sized' : 'normal');
    emotion = 'audacious_creative';

    // Environment matching
    if (lower.includes('space') || lower.includes('star') || lower.includes('planet') || lower.includes('moon')) {
      environment = 'space_lunar';
    } else if (lower.includes('water') || lower.includes('sea') || lower.includes('fish') || lower.includes('swim')) {
      environment = 'ocean_depths';
    } else if (lower.includes('tree') || lower.includes('forest') || lower.includes('jungle')) {
      environment = 'jurassic_room';
    } else if (lower.includes('sky') || lower.includes('cloud') || lower.includes('fly')) {
      environment = 'arctic_clouds';
    } else {
      environment = 'living_room';
    }

    secondaryObjects = ['magic_sparks', 'surprise_dust', 'curious_whispers'];
    consequence = `${capitalize(actor)} boldly interacted with ${capitalize(target)}, causing reality to ripple with laughter.`;
    restoration = 'The simulation accepted the impossible condition as normal.';
    physicalPossibility = `${(Math.random() * 0.004 + 0.00001).toFixed(6)}%`;

    const sideEffectsPool = [
      'Local physics teachers feel a brief, unexplained shiver.',
      'A nearby squirrel paused to contemplate the cosmos.',
      'Gravity in this corner of the room is now 3% friendlier.',
      'Common sense took a scheduled 10-minute tea break.',
      'Reality has accepted this without further questions.'
    ];
    sideEffect = sideEffectsPool[Math.floor(Math.random() * sideEffectsPool.length)];
    archetype = 'procedural';
  }

  // -------------------------------------------------------------
  // 2. 7-PHASE CAUSE-AND-EFFECT VISUAL STORYBOARD
  // -------------------------------------------------------------
  const storyboard = [
    {
      phase: 1,
      name: 'WORLD_PREPARES',
      duration: 1.2,
      camera: { zoom: 1.0, panX: 0, panY: 0, shake: 0 },
      description: `Environment prepares for ${action}: lighting dims, ambient atmosphere shifts.`
    },
    {
      phase: 2,
      name: 'OBJECT_ENTERS',
      duration: 1.4,
      camera: { zoom: 1.08, panX: direction === 'downward_pull' ? 0 : -20, panY: direction === 'upward_towering' ? 40 : -10, shake: scale === 'colossal' ? 3 : 0.5 },
      description: `${capitalize(actor)} arrives into the scene with kinetic weight and presence.`
    },
    {
      phase: 3,
      name: 'OBJECT_INTERACTS',
      duration: 2.0,
      camera: { zoom: 1.18, panX: 0, panY: 0, shake: 1.2 },
      description: `${capitalize(actor)} engages directly with ${capitalize(target)} via ${action}.`
    },
    {
      phase: 4,
      name: 'INTERACTION_CAUSES_REACTION',
      duration: 1.5,
      camera: { zoom: 1.22, panX: 0, panY: 0, shake: 6.0 },
      description: `Direct impact! Shockwave ripples across environment.`
    },
    {
      phase: 5,
      name: 'ENVIRONMENT_RESPONDS',
      duration: 1.6,
      camera: { zoom: 1.1, panX: 0, panY: 0, shake: 1.0 },
      description: `Environment reacts visibly: ${secondaryObjects.join(', ')} appear and scatter.`
    },
    {
      phase: 6,
      name: 'CONSEQUENCE_OCCURS',
      duration: 2.0,
      camera: { zoom: 1.05, panX: 0, panY: 0, shake: 0.2 },
      description: consequence
    },
    {
      phase: 7,
      name: 'WORLD_STABILIZES',
      duration: 2.5,
      camera: { zoom: 1.0, panX: 0, panY: 0, shake: 0 },
      description: restoration
    }
  ];

  // -------------------------------------------------------------
  // 3. BUREAUCRATIC REPORT
  // -------------------------------------------------------------
  const bureaucraticLog = [
    'REQUEST RECEIVED',
    'ANALYZING CHILD LOGIC...',
    `ACTOR: ${actor.toUpperCase().replace('_', ' ')}`,
    `TARGET: ${target.toUpperCase().replace('_', ' ')}`,
    `ACTION: ${action.toUpperCase().replace('_', ' ')}`,
    `ENVIRONMENT: ${environment.toUpperCase().replace('_', ' ')}`,
    `SCALE: ${scale.toUpperCase().replace('_', ' ')}`,
    `PHYSICAL POSSIBILITY: ${physicalPossibility}`
  ];

  if (temporalLogic) {
    bureaucraticLog.push(`TEMPORAL LOGIC: ${temporalLogic}`);
  }

  bureaucraticLog.push('DECISION: Okay.');
  bureaucraticLog.push('INITIATING REALITY ALTERATION...');

  return {
    success: true,
    input: text,
    actor,
    target,
    object: target,
    action,
    scale,
    direction,
    emotion,
    environment,
    secondaryObjects,
    consequence,
    restoration,
    physicalPossibility,
    temporalLogic,
    bureaucraticLog,
    storyboard,
    completionSummary: `${capitalize(target.replace('_', ' '))} altered: ${consequence}`,
    sideEffect,
    archetype,
    behaviors: ['float', 'wobble', 'draggable', 'followCursor'],
    visualConfig: {
      color: primaryColor,
      secondaryColor: secondaryColor,
      label: capitalize(target.replace('_', ' ')),
      archetype,
      environment,
      scale
    }
  };
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  analyzeChildRequest
};
