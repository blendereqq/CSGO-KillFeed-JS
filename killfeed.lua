local ready = false
RegisterNetEvent("onRoundStarted")
AddEventHandler("onRoundStarted", function()
	ready = true;
end)

RegisterNetEvent("killfeed")
AddEventHandler(
    "killfeed",
    function(killer, victim, weapon)
		if not ready then return end
        local weap = weapon

        if killer == victim then
            weap = "suicide"
        end

        SendNUIMessage(
            {
                type = "kill",
                killer = killer,
                victim = victim,
                weapon = string.lower(weap)
            }
        )
    end
)
