local isDriving = false;
local isUnderwater = false;

Citizen.CreateThread(function()
    while true do
        if Config.UnitOfSpeed == "kmh" then
            SpeedMultiplier = 3.6
        elseif Config.UnitOfSpeed == "mph" then
            SpeedMultiplier = 2.236936
        end
        Wait(100)
    end
end)


--[[ 
    ///////////////////////////   SPEEDOMETER  ///////////////////////////
--]]

Citizen.CreateThread(function()
    while true do
        Wait(100)
        local playerPed = PlayerPedId()

        if isDriving and IsPedInAnyVehicle(playerPed, true) then
            local veh = GetVehiclePedIsUsing(playerPed, false)
            local speed = math.floor(GetEntitySpeed(veh) * SpeedMultiplier)
            local vehhash = GetEntityModel(veh)
            local maxspeed = GetVehicleModelMaxSpeed(vehhash) * 3.6
            SendNUIMessage({
                speed = speed, 
                maxspeed = maxspeed
            })
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(1000)
        local playerPed = PlayerPedId()

        if Config.ShowSpeedo then
            if IsPedInAnyVehicle(playerPed, false) and
                not IsPedInFlyingVehicle(playerPed) and
                not IsPedInAnySub(playerPed) then
                isDriving = true
                SendNUIMessage({showSpeedo = true})
            elseif not IsPedInAnyVehicle(playerPed, false) then
                isDriving = false
                SendNUIMessage({showSpeedo = false})
            end
        end

    end
end)

--[[ 
    ///////////////////////////   HEALTH, ARMOR, OXYGEN  //////////////////////
--]]

Citizen.CreateThread(function()
    while true do
        Wait(500)
        local playerPed = PlayerPedId()

        if IsPedSwimmingUnderWater(playerPed) then
            isUnderwater = true
            SendNUIMessage({showOxygen = true})
        elseif not IsPedSwimmingUnderWater(PlayerPedId()) then
            isUnderwater = false
            SendNUIMessage({showOxygen = false})
        end

        SendNUIMessage({
            action = "update_hud",
            hp = GetEntityHealth(playerPed) - 100,
            armor = GetPedArmour(playerPed),
            oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10,
            stamina = GetPlayerSprintTimeRemaining(PlayerId()) * 10,
        })

        if IsPauseMenuActive() then
            SendNUIMessage({showUi = false})
        elseif not IsPauseMenuActive() then
            SendNUIMessage({showUi = true})
        end

    end
end)

--[[ 
    ///////////////////////////   MINIMAP  ///////////////////////////
--]]

-- Map stuff below
local x = -0.025
local y = -0.015
local w = 0.16
local h = 0.25

Citizen.CreateThread(function()

    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)

    while true do
        Wait(0)
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
        BeginScaleformMovieMethod(minimap, 'HIDE_SATNAV')
        EndScaleformMovieMethod()
    end
end)

CreateThread(function()
    while true do
        Wait(2000)
        SetRadarZoom(1150)
        local playerPed = PlayerPedId()

        if Config.AlwaysShowRadar == false then
            if IsPedInAnyVehicle(playerPed, false) then
                DisplayRadar(true)
            else
                DisplayRadar(false)
            end
        elseif Config.AlwaysShowRadar == true then
            DisplayRadar(true)
        end

        if Config.ShowFuel == true then
            if isDriving and IsPedInAnyVehicle(playerPed, true) then
                local veh = GetVehiclePedIsUsing(playerPed, false)
                local fuellevel = GetVehicleFuelLevel(veh)
                SendNUIMessage({
                    action = "update_fuel",
                    fuel = fuellevel,
                    showFuel = true
                })
            end
        elseif Config.ShowFuel == false then
            SendNUIMessage({showFuel = false})
        end

    end
end)

RegisterCommand("togglehud", function()
    SendNUIMessage({action = "toggle_hud"}) 
end, false)