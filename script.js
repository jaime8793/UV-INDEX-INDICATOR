function realTime(){
  let dateTime = new Date();
  let hrs = dateTime.getHours();
  let min = dateTime.getMinutes();
  let sec = dateTime.getSeconds();
  let session = document.querySelector('#session')

  if(hrs >= 12){
    session.innerHTML = "PM";
  } else{
    session.innerHTML = "AM";
  }
  if (hrs > 12){
  hrs = hrs - 12
  }

  document.querySelector('#hours').innerHTML = hrs;
  document.querySelector('#minutes').innerHTML = min;
  document.querySelector('#seconds').innerHTML = sec;


}

setInterval(realTime, 10);


const weather ={
  fetchUVIndex :function(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=65b6e2a8c3622af3622a3030c6a9e1df`)
    .then((response)=> response.json())
    //.then((response)=> console.log(response))
    .then((data)=> this.changeUVIndex(data))
    .catch(err=> console.error(err));

  },
  
  changeUVIndex : function(data){
    const {name} = data;
    const {icon , description } = data.weather[0];
    const {temp } = data.main;
    const {lon , lat } = data.coord;
    console.log (name,icon,description,lon , lat)
    document.querySelector(".city").innerText =`UV Index in ${name} is `;
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°c"
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    /*const options = {
      method: 'GET',
      headers: {
        'x-access-token': 'fcb409146c7459a9e8f703e7e1d42d04',
        'X-RapidAPI-Key': '1e66dc68c1msh37a5f4bbde75838p111bf0jsn9ecc11ba6306',
        'X-RapidAPI-Host': 'aershov-openuv-global-real-time-uv-index-v1.p.rapidapi.com'
      }
    };
    
    fetch(`https://aershov-openuv-global-real-time-uv-index-v1.p.rapidapi.com/api/v1/uv?lat=${lat}&lng=${lon}}`, options)
      .then(response => response.json())
      .then(UVData => console.log(UVData))
      .catch(err => console.error(err));
  
    //realUVIndex : function(UVData){
     // const {uv} = UVData
      / console.log(uv)*/

  //}
  },

  search : function(){
    this.fetchUVIndex(document.querySelector(".search-bar").value);
    //console.log(lon , lat)
  }
};
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});
document.querySelector(".search-bar").addEventListener("key-up" , function(e){
  if(e.key == "Enter"){
    weather.search();
  }
  
});

