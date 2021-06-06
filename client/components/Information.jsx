import React from 'react'
import Donut from './Donut.jsx'

class Information extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var pol_num = {
      'Low': 1,
      'Moderate': 2,
      'High': 3,
      'Very High': 4
    }

    var num_pol = {
      1: 'Low',
      2: 'Moderate',
      3: 'High',
      4: 'Very High'
    }

    var ave = (
      pol_num[this.props.treeStr] +
      pol_num[this.props.grassStr] +
      pol_num[this.props.weedStr]) / 3

    var aveStr = num_pol[Math.round(ave)]

    ave = ave / 4 * 100

    return(
      <div className='information'>
          <div className='information-header'>Pollen count for {this.props.city}</div>

        <div className='new-city'>
          <form onSubmit={this.props.updateCity}>

            Select new city <input type='text'
              placeholder='Malleswaram, Bengaluru'>
            </input>
            <input className='button' type='submit' value='Search' ></input>

          </form>
        </div>


        <div></div><div></div>

        <div className='info-left'>
          <div className='average-string'>{aveStr}</div>
          <Donut ave={ave} aveStr={aveStr}/>
        </div>
        <div>
          <div className='pollen-data'>
            <img className='icon' src='grass.svg'></img>
            <div className='pollen-label'>Grass: {this.props.grassStr}</div>
          </div>
          <div className='pollen-data'>
            <img className='icon' src='tree.svg'></img>
            <div className='pollen-label'>Tree: {this.props.treeStr}</div>
          </div>
          <div className='pollen-data'>
            <img className='icon' src='weed.svg'></img>
            <div className='pollen-label'>Weed: {this.props.weedStr}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Information