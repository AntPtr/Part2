import { useState, useEffect  } from 'react'
import axios from 'axios'

const Weather = ({countr}) => {
  const [temp, setTemp] = useState ()
  const [icon, setIcon] = useState ()
  const [wind, setWind] = useState ()

  const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+countr.capitalInfo.latlng[0]+'&lon='+countr.capitalInfo.latlng[1]+'&appid=2117503f5e5c8c445ba7051b63ea7fd7'
  const weatherhook = () => {axios.get(url).then((resp) => {
    setTemp(resp.data.main.temp)
    setIcon (resp.data.weather[0].icon)
    setWind (resp.data.wind.speed)  
  })
  }
  useEffect(weatherhook, [])

  const png = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  return(
    <div> 
      <h1>Weather in {countr.capital}</h1>
      <p>Temperature {Math.trunc(temp - 273.15)} Celsius</p>
      <img src={png}></img>
      <p>wind {wind} m/s</p>
    </div>
  )

}


const App = () =>  {
  const [countries, setCountires] = useState([])
  const [country, setCountry] = useState('')
  const [filter, setFilter] = useState([])


  const showSwitch = (cnt) => {
    console.log(cnt)
    let tmp = []
    tmp.push(cnt)
    setFilter(tmp)
  }

  const handleChange = (event) => {
    setCountry(event.target.value)
    const fill = countries.filter((countr) => {
      if(countr.name.common.toLowerCase().includes(event.target.value.toLowerCase())) {
        return true
        }
      else  
        return false
      }
    )
    setFilter(fill)
  }

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      setCountires(response.data)
    })
  }
  useEffect(hook, [])

  const lenguages = () => {
    let temp = [];
    filter.forEach((obj) => {
      for (const [key, value] of Object.entries(obj.languages)) {
        temp.push(<li>{value}</li>)
      }
    })
    return(temp)
  }

  const filtered = () => {
    if (filter.length > 10) 
      return( <div>too many matches, specify another filter</div>)
    if (filter.length === 1){
      return(
      filter.map((countr) => {
        return(
          <div>
            <h1>{countr.name.common}</h1>
            <div>capital {countr.capital}</div>
            <div>area {countr.area}</div>
            <h3><b>languages </b></h3>
            <ul>
              {     
                lenguages()
              }
            </ul>
            <img src={countr.flags.png}></img>
            <Weather countr={countr}/>
          </div>
        )
      })
      )
    }
    else  
        return(
          filter.map((countr) => {
            return(
              <div>
                {countr.name.common}<button onClick={() => {showSwitch(countr)}}>show</button>
              </div>
            )
          })
        )
  }

  return(
    <>
      <div>
        find countries : <input value={country} onChange={handleChange}/>
      </div>
      <div>
       {filtered()}
      </div>
   </>
  )
}

export default App;
