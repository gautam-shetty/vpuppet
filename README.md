# vPuppet

FiveM RP server 
> **Note:** Still in pre-alpha phase.

## Installation [Windows]

#### Before you begin

Make sure you have registered a license key on the  [Cfx.re Keymaster](https://keymaster.fivem.net/)  service. You need to have the IP match the  _public_  IP on which you're going to  _first_  use the key. Afterwards, the key can be used on any IP, but only on one server at a time.

#### Prerequisites

1.  [Visual C++ Redistributable 2019](https://aka.ms/vs/16/release/VC_redist.x64.exe) or newer.
2.  [Git](https://git-scm.com/download/win) to assure a correct installation.

### Installation
1.  Create a new directory (for example `D:\FXServer\server`), this will be used for the server binaries.
2.  Download the current recommended `master` branch build for Windows from the [artifacts server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/).
3.  Extract the build into the directory previously created.
4. Clone [vPuppet](https://github.com/gautam-shetty/vpuppet) in a new folder outside of your server binaries folder (for example, `D:\FXServer\server-data`).
	> git clone https://github.com/gautam-shetty/vpuppet.git server-data
5. Make a **server.cfg** file in your `server-data` folder (copy the [example server.cfg](#server.cfg) file below into that file)
6. Set the keys in your `server.cfg`. (example using `sv_licenseKey "licenseKeyGoesHere"`)
7. Run `server\FXServer.exe`
    a. When prompted to choose 'Deployment Type' , select 'Local Server Data'
    b. Target the `server-data` created earlier.

----
## server.cfg
An example server.cfg follows.
```sh
# Only change the IP if you're using a server with multiple network interfaces, otherwise change the port only.
endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

exec resources.cfg

# This allows players to use scripthook-based plugins such as the legacy Lambda Menu.
# Set this to 1 to allow scripthook. Do note that this does _not_ guarantee players won't be able to use external plugins.
sv_scriptHookAllowed 0

# Uncomment this and set a password to enable RCON. Make sure to change the password - it should look like rcon_password "YOURPASSWORD"
#rcon_password ""

# A comma-separated list of tags for your server.
# For example:
# - sets tags "drifting, cars, racing"
# Or:
# - sets tags "roleplay, military, tanks"
sets tags "default"

# A valid locale identifier for your server's primary language.
# For example "en-US", "fr-CA", "nl-NL", "de-DE", "en-GB", "pt-BR"
sets locale "root-AQ" 
# please DO replace root-AQ on the line ABOVE with a real language! :)

# Set an optional server info and connecting banner image url.
# Size doesn't matter, any banner sized image will be fine.
#sets banner_detail "https://url.to/image.png"
#sets banner_connecting "https://url.to/image.png"

# Set your server's hostname
sv_hostname "vPuppet (unconfigured)"

# Set your server's Project Name
sets sv_projectName "FXServer - vPuppet"

# Set your server's Project Description
sets sv_projectDesc "FXServer | Beta"

# Nested configs!
#exec server_internal.cfg

# Loading a server icon (96x96 PNG file)
#load_server_icon myLogo.png

# Remove the `#` from the below line if you do not want your server to be listed in the server browser.
# Do not edit it if you *do* want your server listed.
#sv_master1 ""

# Add system admins
add_ace group.admin command allow # allow all commands
add_ace group.admin command.quit deny # but don't allow quit
add_principal identifier.steam:yourSteamHexId group.admin # add the admin to the group

# enable OneSync (required for server-side state awareness)
set onesync on

# Server player slot limit (see https://fivem.net/server-hosting for limits)
sv_maxclients 32

# Steam Web API key, if you want to use Steam authentication (https://steamcommunity.com/dev/apikey)
# -> replace "" with the key
set steam_webApiKey "yourSteamWebApiKey"

# License key for your server (https://keymaster.fivem.net)
sv_licenseKey yourServerLicenseKey

```