import React from 'react'
import Information from './Information.jsx'
import $ from 'jquery'

const pollenDensity = ['Low', 'Low', 'Low', 'Moderate', 'Moderate', 'Moderate', 'High', 'Very High']
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tree: null,
      grass: null,
      weed: null,
      treeStr: pollenDensity[Math.floor(Math.random() * 8)],
      grassStr: pollenDensity[Math.floor(Math.random() * 8)],
      weedStr: pollenDensity[Math.floor(Math.random() * 8)],
      city: 'Random'
    }

    this.updateCity = this.updateCity.bind(this)
  }

  componentDidMount() {
    window.grassStr = this.state.grassStr
    window.treeStr = this.state.treeStr
    window.weedStr = this.state.weedStr
    window.init(window.grassStr, window.treeStr, window.weedStr)
  }

  updateCity(e) {
    e.preventDefault()

    $.ajax({
      method: 'GET',
      url: '/pollen',
      data: {place: e.target[0].value},
      success: (data) => {
        this.setState(data)
        window.grassStr = data.grassStr
        window.treeStr = data.treeStr
        window.weedStr = data.weedStr
        window.init(window.grassStr, window.treeStr, window.weedStr)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  render() {
    return (
      <div className='layout'>
        <div className='header'>Pollen Fairy
        {/* <a href="https://ramisa.co/"> */}
        <a href="mailto:rrchow97@gmail.com">
          <div className='contact'>Contact Me</div>
        </a>
        </div>
        <Information {...this.state} updateCity={this.updateCity}/>
      </div>
    )
  }
}

export default App