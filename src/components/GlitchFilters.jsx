import React from 'react';

export default function GlitchFilters() {
  return (
    <svg
      id="glitch-filters"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="glass-filter" x="0%" y="0%" width="100%" height="100%">
          <feDisplacementMap
            id="redchannel"
            in="SourceGraphic"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispRed"
          />
          <feColorMatrix
            in="dispRed"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="red"
          />

          <feDisplacementMap
            id="greenchannel"
            in="SourceGraphic"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispGreen"
          />
          <feColorMatrix
            in="dispGreen"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="green"
          />

          <feDisplacementMap
            id="bluechannel"
            in="SourceGraphic"
            scale="-4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispBlue"
          />
          <feColorMatrix
            in="dispBlue"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blue"
          />

          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur in="output" stdDeviation="0.7" />
        </filter>
      </defs>
    </svg>
  );
}

