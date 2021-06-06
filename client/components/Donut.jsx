import React from 'react'
import shortid from 'shortid'
var pol_col = {
  'Low': 'rgb(19, 211, 2)',
  'Moderate': 'rgb(255, 203, 0)',
  'High': 'rgb(255, 157, 0)',
  'Very High': 'rgb(154, 0, 0)'
}

const Donut = (props) => (
  <div className="donut-chart" key={shortid.generate()}>
    <svg viewBox="0 0 50 50" className="circular-chart">
    <path className="circle-border"
        d="M25 9.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        style={{
          fill: 'none',
          stroke: 'rgb(255, 255, 255)',
          strokeWidth: '13'
        }}
      />

      <path className="circle-bg"
        d="M25 9.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        style={{
          fill: 'none',
          stroke: 'rgb(220, 220, 220)',
          strokeWidth: '11'
        }}
      />
      <path className="circle"
        strokeDasharray={props.ave + ", 100"}
        d="M25 9.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        style={{
          fill: 'none',
          strokeWidth: '11',
          stroke: pol_col[props.aveStr],
          animation: 'progress 1s ease-out forwards'
        }}
      />

    </svg>
  </div>

)

export default Donut