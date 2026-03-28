(function () {
  'use strict';

  // src/animations.js
  const FLOAT = {
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

  const WAVE = {
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

  const EYES_OPEN = {
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

  const EYES_SQUINT = {
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

  // src/mascot.js
  class ClaudeMascot extends HTMLElement {
    static get observedAttributes() {
      return [
        'size', 'color',
        'no-float', 'no-blink', 'no-wave', 'no-animate',
        'blink-interval', 'wave-interval', 'float-duration',
        'label',
      ];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this._render();
    }

    attributeChangedCallback() {
      this._render();
    }

    _render() {
      const noAnimate = this.hasAttribute('no-animate');
      const opts = {
        size:          parseFloat(this.getAttribute('size'))           || 90,
        color:         this.getAttribute('color')                      || '#c8614e',
        noFloat:       this.hasAttribute('no-float') || noAnimate,
        noBlink:       this.hasAttribute('no-blink') || noAnimate,
        noWave:        this.hasAttribute('no-wave')  || noAnimate,
        blinkInterval: parseFloat(this.getAttribute('blink-interval')) || 4,
        waveInterval:  parseFloat(this.getAttribute('wave-interval'))  || 12,
        floatDuration: parseFloat(this.getAttribute('float-duration')) || 3.2,
        label:         this.getAttribute('label'),
      };

      this.shadowRoot.innerHTML =
        `<style>${this._buildStyles(opts)}</style>` +
        this._buildSVG(opts);
    }

    _buildStyles(opts) {
      let css = `
:host {
  display: inline-block;
  width: ${opts.size}px;
  line-height: 0;
}
svg {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
}
.arm {
  transform-origin: ${WAVE.transformOrigin};
}
`;

      if (!opts.noFloat) {
        css += `
.${FLOAT.targetClass} {
  animation: ${FLOAT.name} ${opts.floatDuration}s ${FLOAT.defaultTimingFn} ${FLOAT.defaultIterationCount};
}
@keyframes ${FLOAT.name} { ${FLOAT.keyframes} }
`;
      }

      if (!opts.noWave) {
        css += `
.${WAVE.targetClass} {
  animation: ${WAVE.name} ${opts.waveInterval}s ${WAVE.defaultTimingFn} ${WAVE.defaultIterationCount};
}
@keyframes ${WAVE.name} { ${WAVE.keyframes} }
`;
      }

      if (!opts.noBlink) {
        css += `
.${EYES_OPEN.targetClass} {
  animation: ${EYES_OPEN.name} ${opts.blinkInterval}s ${EYES_OPEN.defaultTimingFn} ${EYES_OPEN.defaultIterationCount};
}
@keyframes ${EYES_OPEN.name} { ${EYES_OPEN.keyframes} }
.${EYES_SQUINT.targetClass} {
  animation: ${EYES_SQUINT.name} ${opts.blinkInterval}s ${EYES_SQUINT.defaultTimingFn} ${EYES_SQUINT.defaultIterationCount};
}
@keyframes ${EYES_SQUINT.name} { ${EYES_SQUINT.keyframes} }
`;
      } else {
        css += `
.eyes-open   { opacity: 1; }
.eyes-squint { opacity: 0; }
`;
      }

      return css;
    }

    _buildSVG(opts) {
      const c = opts.color;
      const labelAttr = opts.label
        ? `role="img" aria-label="${opts.label}"`
        : `aria-hidden="true"`;

      return `<svg viewBox="-5 -12 120 100" xmlns="http://www.w3.org/2000/svg" ${labelAttr}>
  <g class="mascot">
    <!-- body -->
    <rect x="10" y="0"     width="90" height="65.25" fill="${c}"/>
    <!-- left arm -->
    <rect x="0"  y="21.75" width="10" height="21.75" fill="${c}"/>
    <!-- right arm (waves) -->
    <g class="arm">
      <rect x="100" y="21.75" width="10" height="21.75" fill="${c}"/>
    </g>
    <!-- shoulder cover -->
    <rect x="98" y="21.75" width="8"  height="21.75" fill="${c}"/>
    <!-- legs -->
    <rect x="10" y="65.25" width="10" height="21.75" fill="${c}"/>
    <rect x="30" y="65.25" width="10" height="21.75" fill="${c}"/>
    <rect x="70" y="65.25" width="10" height="21.75" fill="${c}"/>
    <rect x="90" y="65.25" width="10" height="21.75" fill="${c}"/>
    <!-- open eyes -->
    <g class="eyes-open">
      <rect x="20" y="21.75" width="10" height="10.88" fill="#1a1a1a"/>
      <rect x="80" y="21.75" width="10" height="10.88" fill="#1a1a1a"/>
    </g>
    <!-- squint eyes -->
    <g class="eyes-squint">
      <polyline points="21,22.5 28.5,27.19 21,31.9"  fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linejoin="miter" stroke-linecap="butt"/>
      <polyline points="89,22.5 81.5,27.19 89,31.9"  fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linejoin="miter" stroke-linecap="butt"/>
    </g>
  </g>
</svg>`;
    }
  }

  if (!customElements.get('claude-mascot')) {
    customElements.define('claude-mascot', ClaudeMascot);
  }

})();
