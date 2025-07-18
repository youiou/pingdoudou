let data = JSON.parse(localStorage.getItem("data")) || {"attempts": 3, "money": 0};

let attempts = data.attempts;
let money = data.money;

function saveToStorage(){
    localStorage.setItem('data', JSON.stringify(data));
}

document.querySelector(".attempts").innerHTML = `You have ${attempts} attempt`
document.querySelector(".js-money").innerHTML = `You win: $${money}`

document.querySelector(".js-start-btn").addEventListener("click", () => {
    if (attempts > 0){
        attempts -= 1;
        data.attempts = attempts;

        document.querySelector(".attempts").innerHTML = `You have ${attempts} attempt` 

        let degree = Math.floor(spinDegree());
        const fullSpins = 1080;

        let prize = identifyPrize(degree);

        const finalDegree = degree + fullSpins;



        document.querySelector(".js-money").innerHTML = `You win: $${money}`


        document.getElementById("start-button").disabled = true;



        const wheel = document.getElementById("js-wheel");
        if (wheel.classList.contains("spinning")) return;

       
        // Set CSS custom property for the animation
        wheel.style.setProperty("--final-degree", `${finalDegree}deg`);
        wheel.classList.add("spinning");

        // Remove spinning class after animation
        setTimeout(() => {
            wheel.classList.remove("spinning");
            document.getElementById("start-button").disabled = false;
        }, 3000);

        setTimeout(() => {
            document.getElementById("prize-text").innerHTML = `${prize}`;
        }, 2000);

        saveToStorage();

    } else if (attempts = 0) {
        document.getElementById("start-button").disabled = true;
    }

});

function spinDegree() {
  let randomDegree = Math.random();
  let randomProb = Math.random();
  if (randomProb <= 0.35) {
    return 1080 - 45 * randomDegree;
  } else if (0.35 < randomProb && randomProb <= 0.45) {
    return 1035 - 45 * randomDegree;
  } else if (0.45 < randomProb && randomProb <= 0.49) {
    return 990 - 45 * randomDegree;
  } else if (0.49 < randomProb && randomProb <= 0.84) {
    return 900 - 45 * randomDegree;
  } else if (0.84 < randomProb && randomProb <= 0.94) {
    return 855 - 45 * randomDegree;
  } else if (randomProb > 0.94) {
    return 810 - 45 * randomDegree;
  }
}

function identifyPrize(degree) {
    if (degree <= 1080 && degree > 1035) {
        return "Try Again";
    } else if (degree <= 1035 && degree > 990) {
        return "你得到了碎片1個";
    } else if (degree <= 990 && degree > 945) {
        money += 0.05;
        data.money = money;
        saveToStorage();
        return "你得到了$0.05";
    } else if (degree <= 900 && degree > 855) {
        return "Try Again";
    } else if (degree <= 855 && degree > 810) {
        money += 0.01;
        data.money = money;
        saveToStorage();
        return "你得到了$0.01";
    } else if (degree <= 810 && degree > 755) {
        return "你得到了貝殼1個";
    }
}