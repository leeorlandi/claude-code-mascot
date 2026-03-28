export const FLOAT = {
  name: 'mascot-float',
  keyframes: `
    0%, 100% { transform: translateY(0px);  }
    50%      { transform: translateY(-10px); }
  `,
  defaultDuration: '3.2s',
  defaultTimingFn: 'ease-in-out',
  defaultIterationCount: 'infinite',
  targetClass: 'mascot',
};

export const WAVE = {
  name: 'mascot-wave',
  keyframes: `
    0%     { transform: rotate(0deg);   }
    3.3%   { transform: rotate(-22deg); }
    6.7%   { transform: rotate(8deg);   }
    10%    { transform: rotate(-18deg); }
    13.3%  { transform: rotate(6deg);   }
    16.7%  { transform: rotate(0deg);   }
    100%   { transform: rotate(0deg);   }
  `,
  defaultDuration: '12s',
  defaultTimingFn: 'ease-in-out',
  defaultIterationCount: 'infinite',
  targetClass: 'arm',
  transformOrigin: '100px 32.625px',
};

export const EYES_OPEN = {
  name: 'mascot-eyes-open',
  keyframes: `
    0%, 88%   { opacity: 1; }
    89%, 100% { opacity: 0; }
  `,
  defaultDuration: '4s',
  defaultTimingFn: 'step-end',
  defaultIterationCount: 'infinite',
  targetClass: 'eyes-open',
};

export const EYES_SQUINT = {
  name: 'mascot-eyes-squint',
  keyframes: `
    0%, 88%   { opacity: 0; }
    89%, 95%  { opacity: 1; }
    96%, 100% { opacity: 0; }
  `,
  defaultDuration: '4s',
  defaultTimingFn: 'step-end',
  defaultIterationCount: 'infinite',
  targetClass: 'eyes-squint',
};
