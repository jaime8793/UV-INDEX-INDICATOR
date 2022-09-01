const weather ={
  fetchUVIndex :function(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=65b6e2a8c3622af3622a3030c6a9e1df`)
    .then((response)=> response.json())
    .then((data)=> this.changeUVIndex(data))
  },
  
  changeUVIndex : function(data){
    const {name} = data;
    const {icon , description } = data.weather[0];
    const {temp } = data.main;
    //const {lon , lat} = data.coordinates;
    console.log (name,icon,description)
    console.log (data.coordinates)
    document.querySelector(".city").innerText =`UV Index in ${name}`;
    document.querySelector(".icon").src = "https://openweather.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°c"
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
  },
  search : function(){
    this.fetchUVIndex(document.querySelector(".search-bar").value);
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

