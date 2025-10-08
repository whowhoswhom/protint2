export type MuscleId =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves';

export interface MuscleContent {
  id: MuscleId;
  name: string;
  summary: string;
  quickTip: string;
  highlightColor: string;
  gifUrl: string;
  workouts: Array<{
    name: string;
    description: string;
    equipment: string;
  }>;
}

export const MUSCLES: MuscleContent[] = [
  {
    id: 'chest',
    name: 'Chest',
    summary: 'Power your presses and push-ups with resilient pecs.',
    quickTip: 'Drive your palms together at the top for full pec engagement.',
    highlightColor: '#ff6b6b',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZxdjR0ZjQ0ZDJmeHh3cmplMHF4a2l6dmJmNHhkZHF5cW1tbnJxYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12XDYvMJNcmLgQ/giphy.gif',
    workouts: [
      {
        name: 'Dumbbell Bench Press',
        description: 'Controlled tempo with a two-second pause just above the chest.',
        equipment: 'Dumbbells + flat bench',
      },
      {
        name: 'Incline Push-Up',
        description: 'Elevated hands to bias upper chest while keeping core braced.',
        equipment: 'Bench or box',
      },
      {
        name: 'Cable Fly',
        description: 'Sweep in a hugging motion, keeping elbows slightly soft.',
        equipment: 'Cable stack',
      },
    ],
  },
  {
    id: 'back',
    name: 'Back',
    summary: 'Build a strong, stable back that anchors every heavy pull.',
    quickTip: 'Think “drive the elbows to your hips” on every row.',
    highlightColor: '#4dabf7',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2phODlhYzhraTM0M3N0N2ZybTNuYXdza2x5c2Z6MDlnOTk4cXJrNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6Zt8zb1P4xTZ1AC0/giphy.gif',
    workouts: [
      {
        name: 'Bent-Over Row',
        description: 'Neutral spine and controlled squeeze between shoulder blades.',
        equipment: 'Barbell',
      },
      {
        name: 'Lat Pulldown',
        description: 'Soft grip and lead with the elbows to the ribs.',
        equipment: 'Cable machine',
      },
      {
        name: 'Face Pull',
        description: 'External rotate at the finish to light up rear delts.',
        equipment: 'Cable machine + rope',
      },
    ],
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    summary: '360° shoulder strength for presses, reaches, and holds.',
    quickTip: 'Keep ribs down and lock in a solid base before you press overhead.',
    highlightColor: '#ffd43b',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3B6aDM1enlwczd1aTN2MzM1dDJyOTYzaHZjM3h3dThqODk3YmM5NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j5k5R6vpe9o8g/giphy.gif',
    workouts: [
      {
        name: 'Seated Dumbbell Press',
        description: 'Drive dumbbells up with stacked wrists and elbows slightly forward.',
        equipment: 'Dumbbells + bench',
      },
      {
        name: 'Lateral Raise',
        description: 'Lead with elbows and pause briefly at shoulder height.',
        equipment: 'Light dumbbells',
      },
      {
        name: 'Pike Push-Up',
        description: 'Hips high, crown of head tracing toward hands for shoulder focus.',
        equipment: 'Bodyweight',
      },
    ],
  },
  {
    id: 'arms',
    name: 'Arms',
    summary: 'Arm definition and pressing support from balanced flexors/extensors.',
    quickTip: 'Lock the upper arm in place to isolate biceps and triceps.',
    highlightColor: '#b197fc',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWcwZXU0eHhpYzZtcXR6ZTNyc3VvZjg4cTcwOWFvOG52N3d3cGE0biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKrQeArYQX5pO7y/giphy.gif',
    workouts: [
      {
        name: 'Hammer Curl',
        description: 'Neutral grip to hit brachialis and forearms.',
        equipment: 'Dumbbells',
      },
      {
        name: 'Cable Pushdown',
        description: 'Elbows tucked, extend while squeezing triceps hard.',
        equipment: 'Cable machine',
      },
      {
        name: 'Close-Grip Push-Up',
        description: 'Hands under shoulders to crush the triceps lockout.',
        equipment: 'Bodyweight',
      },
    ],
  },
  {
    id: 'core',
    name: 'Core',
    summary: 'Bracing strength that connects upper and lower body power.',
    quickTip: 'Exhale through the sticking point while keeping ribs stacked over hips.',
    highlightColor: '#69db7c',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajdiNzEzajRveHVuNW41cjh1dXEyajl1YzhtMGl6ZXVpaDA0OTVlaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7buirYCMq2EpB30A/giphy.gif',
    workouts: [
      {
        name: 'Hollow Body Hold',
        description: 'Lock in rib-to-hip tension for 20–30 seconds.',
        equipment: 'Bodyweight',
      },
      {
        name: 'Cable Pallof Press',
        description: 'Anti-rotation press for bulletproof obliques.',
        equipment: 'Cable machine',
      },
      {
        name: 'Dead Bug',
        description: 'Opposite arm/leg reach while keeping lower back glued down.',
        equipment: 'Bodyweight',
      },
    ],
  },
  {
    id: 'glutes',
    name: 'Glutes',
    summary: 'Hip power that drives squats, hinges, and sprint speed.',
    quickTip: 'Squeeze the floor apart with your feet to wake up the glutes.',
    highlightColor: '#ff922b',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Fna2NjY2E0bnRxZmZnbmV5OGV4OGVveHp1czZuYmU5djhvMnJqYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1d5Kzq1aQ8M1K/giphy.gif',
    workouts: [
      {
        name: 'Barbell Hip Thrust',
        description: 'Drive through heels and pause at the top for a full squeeze.',
        equipment: 'Barbell + bench',
      },
      {
        name: 'Walking Lunge',
        description: 'Tall torso with a slight forward torso lean on the way down.',
        equipment: 'Dumbbells or bodyweight',
      },
      {
        name: 'Glute Bridge March',
        description: 'Single-leg marching while keeping hips level.',
        equipment: 'Bodyweight',
      },
    ],
  },
  {
    id: 'quads',
    name: 'Quads',
    summary: 'Front-of-leg armor for squats, lunges, and explosive jumps.',
    quickTip: 'Track knees over second toe while keeping heels grounded.',
    highlightColor: '#ff8787',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWwyNjZjYzFhdW1lcnpldWlwcnFnbm1yeWxob2dicmo1dXlqZHQ2ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif',
    workouts: [
      {
        name: 'Front Squat',
        description: 'Elbows high, chest tall, and sit between the heels.',
        equipment: 'Barbell',
      },
      {
        name: 'Leg Extension',
        description: 'Squeeze for a count at full knee lockout.',
        equipment: 'Machine',
      },
      {
        name: 'Split Squat',
        description: 'Long stride and slow tempo for quad dominance.',
        equipment: 'Dumbbells or bodyweight',
      },
    ],
  },
  {
    id: 'hamstrings',
    name: 'Hamstrings',
    summary: 'Posterior chain support for hinges, sprints, and deceleration.',
    quickTip: 'Push hips back and maintain soft knees for a deep stretch.',
    highlightColor: '#9775fa',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3RwOGdodDVydDZybzdrZDNvMTV6aGh2MDZiNDdhY3h0aGN5NjI2OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oxRmNql7B7h6QW8Aw/giphy.gif',
    workouts: [
      {
        name: 'Romanian Deadlift',
        description: 'Soft knees and hinge until hamstrings are lit up.',
        equipment: 'Barbell or dumbbells',
      },
      {
        name: 'Glute-Ham Raise',
        description: 'Control the eccentric and drive up with hips and hams.',
        equipment: 'GHD machine',
      },
      {
        name: 'Nordic Curl',
        description: 'Slow descent, catch yourself, and explode up.',
        equipment: 'Bodyweight + anchor',
      },
    ],
  },
  {
    id: 'calves',
    name: 'Calves',
    summary: 'Spring-loaded lower legs that propel every stride and jump.',
    quickTip: 'Pause for a second at the top to build explosive strength.',
    highlightColor: '#63e6be',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWNjcTQxM2xrNWZqam4xaXgwOW5kcDg1YTlxeDB3YjBkbHFjZ2tsMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l1AswA8hd1k3ZCwgo/giphy.gif',
    workouts: [
      {
        name: 'Standing Calf Raise',
        description: 'Full range of motion with deliberate tempo.',
        equipment: 'Bodyweight or machine',
      },
      {
        name: 'Seated Calf Raise',
        description: 'Hit the soleus by keeping knees bent at 90 degrees.',
        equipment: 'Machine or dumbbells',
      },
      {
        name: 'Jump Rope Intervals',
        description: 'Light, quick rebounds to build reactive strength.',
        equipment: 'Jump rope',
      },
    ],
  },
];

export const MUSCLE_ORDER: MuscleId[] = [
  'chest',
  'shoulders',
  'arms',
  'back',
  'core',
  'glutes',
  'quads',
  'hamstrings',
  'calves',
];

export const DEFAULT_MUSCLE = MUSCLES[0];
