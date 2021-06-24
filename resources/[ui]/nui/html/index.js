$(document).ready(function () {
    HealthIndicator = new ProgressBar.Circle("#HealthIndicator", {
        color: "rgb(0, 182, 91)",
        trailColor: "green",
        strokeWidth: 10,
        trailWidth: 10,
        duration: 250,
        easing: "easeInOut",
    });
  
    ArmorIndicator = new ProgressBar.Circle("#ArmorIndicator", {
        color: "rgb(201, 36, 36)",
        trailColor: "rgb(124, 30, 30)",
        strokeWidth: 10,
        trailWidth: 10,
        duration: 250,
        easing: "easeInOut",
    });
  
    OxygenIndicator = new ProgressBar.Circle("#OxygenIndicator", {
        color: "rgb(0, 140, 255)",
        trailColor: "rgb(0, 85, 155)",
        strokeWidth: 10,
        trailWidth: 10,
        duration: 250,
        easing: "easeInOut",
    });

    StaminaIndicator = new ProgressBar.Circle("#StaminaIndicator", {
        color: "rgb(251, 147, 0)",
        trailColor: "rgb(146, 85, 0)",
        strokeWidth: 10,
        trailWidth: 10,
        duration: 250,
        easing: "easeInOut",
    });
  
    Speedometer = new ProgressBar.Circle("#SpeedCircle", {
        color: "rgba(222, 222, 222, 1)",
        trailColor: "rgba(184, 184, 184, 0.082)",
        strokeWidth: 6,
        duration: 100,
        trailWidth: 6,
        easing: "easeInOut",
    });

    FuelIndicator = new ProgressBar.Circle("#FuelCircle", {
        color: "rgba(222, 222, 222, 1)",
        trailColor: "rgba(184, 184, 184, 0.082)",
        strokeWidth: 8,
        duration: 2000,
        trailWidth: 8,
        easing: "easeInOut",
    });

});

window.addEventListener("message", function (event) {
    let data = event.data;
  
    if (data.action == "update_hud") {
        HealthIndicator.animate(data.hp / 100);
        ArmorIndicator.animate(data.armor / 100);
        OxygenIndicator.animate(data.oxygen / 100);
        StaminaIndicator.animate(data.stamina / 100);
    }
  
    // Show oxygen if underwater
    if (data.showOxygen == true) {
        $("#OxygenIndicator").show();
    } else if (data.showOxygen == false) {
        $("#OxygenIndicator").hide();
    }
  
    // Hide armor if 0
    if (data.armor == 0) {
        $("#ArmorIndicator").fadeOut();
    } else if (data.armor > 0) {
        $("#ArmorIndicator").fadeIn();
    }
  
    // Change color and icon if HP is 0 (dead)
    if (data.hp < 0) {
        HealthIndicator.animate(0);
        HealthIndicator.trail.setAttribute("stroke", "red");
        $("#hp-icon").removeClass("fa-heart");
        $("#hp-icon").addClass("fa-skull");
    } else if (data.hp > 0) {
        HealthIndicator.trail.setAttribute("stroke", "green");
        $("#hp-icon").removeClass("fa-skull");
        $("#hp-icon").addClass("fa-heart");
    }

    if(data.oxygen < 0) {
        OxygenIndicator.animate(0);
        OxygenIndicator.trail.setAttribute("stroke", "red");
    } else if (data.oxygen > 0) {
        OxygenIndicator.trail.setAttribute("stroke", "rgb(0, 85, 155)");
    }

    if(data.stamina < 3) {
        StaminaIndicator.animate(0);
        StaminaIndicator.trail.setAttribute("stroke", "rgb(192, 56, 0)");
        $("#stamina-icon").removeClass("fas fa-running");
        $("#stamina-icon").addClass("fas fa-tired");
    } else if (data.oxygen > 0) {
        StaminaIndicator.trail.setAttribute("stroke", "rgb(146, 85, 0)");
        $("#stamina-icon").removeClass("fas fa-tired");
        $("#stamina-icon").addClass("fas fa-running");
    }
  
    if (data.speed > 0) {
        $("#SpeedIndicator").text(data.speed);
        let multiplier = data.maxspeed * 0.1;
        let SpeedoLimit = data.maxspeed + multiplier;
        Speedometer.animate(data.speed / SpeedoLimit);
        Speedometer.path.setAttribute("stroke", "white");
    } else if (data.speed == 0) {
        $("#SpeedIndicator").text("0");
        Speedometer.path.setAttribute("stroke", "none");
    }

    if (data.action == "update_fuel") {
        let finalfuel = (data.fuel / 100) * 1.5385;
        if (finalfuel > 0.9) {
            FuelIndicator.animate(1.0);
        } else if (finalfuel < 0.9) {
            FuelIndicator.animate(finalfuel);
        }
        if (finalfuel < 0.2) {
            FuelIndicator.path.setAttribute("stroke", "red");
        } else if (finalfuel > 0.2) {
            FuelIndicator.path.setAttribute("stroke", "white");
        }
    }
  
    if (data.showSpeedo == true) {
        $("#VehicleContainer").fadeIn();
    } else if (data.showSpeedo == false) {
        $("#VehicleContainer").fadeOut();
    }
  
    if (data.showUi == true) {
        $(".container").show();
    } else if (data.showUi == false) {
        $(".container").hide();
    }

    if (data.action == "toggle_hud") {
        $("body").fadeToggle()
    }
});