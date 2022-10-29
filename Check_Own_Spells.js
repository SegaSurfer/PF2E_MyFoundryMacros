/*
This macro is a quick and dirty! solution for the friendly caster next door, who's not able to keep track of his own spells, dmgTypes and target saves.

It will query all the current spells in the character sheet (not tested with spell books yet) and will filter these spells for spell level, dmgtype, and save.
It does simple things and is easy to use.

It's far far away (actually in another galaxy) from well written code and I ignored a lot of best practices (please don't look at the var cases or types).
It's ugly, it's not really performant, but it does it's job quite good.

IMPORTANT NOTE: You have to have an actor selected or it will horribly crash... 
doing weird things and forces you to reload your page (if you are lucky). 
If you are unlucky, it will come to life and will probably end the existence of all living things.. who knows.

I created this abomination, which means that I was naughty and get no presents from Santa... However, I hope my players will still like it ;) 

... I should probably should have used a dictionary though ...

*/

// check if actor

if (!actor) {
    ui.notifications.warn("You must have an actor selected.");
}

// build UI

let savechattext = "";
let levelchattext = "";
let applyChanges = false;
let dmgValue = "";
let savetype ="";
let dmgText ="";
let issave = false;
let isattack = false;
let spells;
let dialogcontent = "";
let levelfilter = false;
let iscantrip = false;
let leveltofilter = "";
let spelllevel;
let spellsavetype;
let dmgtype;
let dmgtypefilter = "";
let dmgspells;

// all spell dmg types:
var dmgType = [];
dmgspells = actor.itemTypes.spell;
for (var i = 0; i < dmgspells.length; i++) {
    if(jQuery.isEmptyObject(dmgspells[i].data.data.damage)){
    }
    else{
        if(jQuery.isEmptyObject(dmgspells[i].data.data.damage.value)){}
        else{
            for (const property in dmgspells[i].data.data.damage.value){
                dmgType.push(String(dmgspells[i].data.data.damage.value[property].type.value));
            }
        }
    }
}
dmgType = [...new Set(dmgType)];

// Build main dialog dmgtype select
let maindialogcontentdmgtype ="";

for (var x = 0; x < dmgType.length; x++) {
    maindialogcontentdmgtype += '<option value="' + dmgType[x] + '">' + dmgType[x] + '</option>';
}


new Dialog({
  title: `Filter a spell in your current (daily) selection`,
  content: `
    <div>
        Select a filter. Be aware the spells get filtered by the respected priority of the selections (save -> level -> ...). <br>
        Results are NOT in order! (currently).
        Furthermore, there are 0 checks for spell slots yet. 
    </div>
    <hr/>
    <form>
        <div class="form-group">
            <label>Save Type:</label>
            <select name="saves" id="saves">
                <option value="reflex">Reflex</option>
                <option value="will">Will</option>
                <option value="fortitude">Fortitude</option>
                <option value="attack">Armor Class (spell attack)</option>
                <option value="nosavefilter" selected="selected">Every (don't filter)</option>
            </select>
        </div>
        <div class="form-group">
            <label>Spell Level:</label>
            <select name="level" id="level">
                <option value="nolevelfilter" selected="selected">Every (don't filter)</option>
                <option value="cantrip">Cantrip</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="form-group">
        <label>Dmg Type:</label>
        <select name="dmgtype" id="dmgtype">
            <option value="nodmgtype" selected="selected">Every (don't filter)</option>` + maindialogcontentdmgtype + `
        </select>
    </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Start searching!`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
        
        // query the selects to apply filters
		switch(html.find('[id="saves"]')[0].value){
            case "reflex":
                savechattext = "Reflex";
                issave = true;
                break;
            case "will":
                savechattext = "Will";
                issave = true;
                break;
            case "fortitude":
                savechattext = "Fortitude";
                issave = true;
                break;
            case "attack":
                savechattext = "Spell Attack";
                isattack = true;
                break;
            default:
                savechattext = "No filter";
        }
        
        switch(html.find('[id="level"]')[0].value){
            case "cantrip":
                iscantrip = true;
                levelchattext = "Cantrip";
                break;
            case "nolevelfilter":
                levelfilter = false;
                levelchattext = "No Filter";
                break;
            default:
                levelfilter = true;
                leveltofilter = html.find('[id="level"]')[0].value;
                levelchattext = "Level: " + leveltofilter;
        }

        if(html.find('[id="dmgtype"]')[0].value == "nodmgtype"){}
        else{
            dmgtypefilter = html.find('[id="dmgtype"]')[0].value;
        }


        //create array of spells
        if(issave){
		    spells = actor.itemTypes.spell.filter(s => s.data.data.save.value == html.find('[id="saves"]')[0].value);
        }
        else if(isattack){
            spells = actor.itemTypes.spell.filter(s => s.data.data.spellType.value == html.find('[id="saves"]')[0].value);
        }
        else{
            spells = actor.itemTypes.spell;
        }
        //Check for Cantrip
        if(iscantrip){
            spells = spells.filter(s => s.data.data.traits.value.includes("cantrip"));
        }
        //Check for spellLevel
        if(levelfilter){
            spells = spells.filter(s => s.data.data.level.value == parseInt(leveltofilter));
        }

        //Check if Spells is Empty
        if (jQuery.isEmptyObject(spells)){
            dialogcontent = "<div><h1> Wow such Empty! </h1></div>";
        }
        else {
            //build filter overview
            dialogcontent = "<div><h1>Your filters: </h1></div><br>"
            dialogcontent += "<div><table>"
            dialogcontent += "<tr><th>Saves<th><td>"+savechattext+"</td></tr>";
            dialogcontent += "<tr><th>Level<th><td>"+levelchattext+"</td></tr>";
            dialogcontent += "</table></div>"
            
            //query Spells
            dialogcontent += "<div><h2>Here comes your result.. are you ready?</h2></div>"
            dialogcontent += "<div><table>"
            dialogcontent += "<tr><th>Level</th><th>Name</th><th>Save</th><th>Basic</th><th>DamageType</th></tr>"; 
            
            //Build the <tr> for all spells
            for (var i = 0; i < spells.length; i++) {
                //clear the data (just in case)
                spelllevel = "";
                spellsavetype = "";
                savetype = "";
                dmgValue = "";
                dmgText = "";
                dmgtype = "";

                dialogcontent += "<tr>";

                if(iscantrip){
                    spelllevel = "cantrip";
                }
                else{
                    if(spells[i].data.data.traits.value.includes("cantrip")){
                        spelllevel = 0;
                    }
                    else{
                        spelllevel = String(spells[i].data.data.level.value);
                    }
                }

                //Check which save type
                if(isattack || issave){
                    spellsavetype = savechattext
                }
                else{
                    if(spells[i].data.data.traits.value.includes("attack")){
                        spellsavetype = "Spell attack";
                    }
                    else{
                        spellsavetype = spells[i].data.data.save.value
                    }
                }

                //check for Basic SAves
                if(spells[i].data.data.save.basic){
                    savetype="<b> Basic </b>";
                }
                else{
                    savetype ="";
                }

                //Check for dmg and Type
                if(jQuery.isEmptyObject(spells[i].data.data.damage)){
                    dmgValue = "";
                }
                else{
                    if(jQuery.isEmptyObject(spells[i].data.data.damage.value)){}
                    else{
                        for (const property in spells[i].data.data.damage.value){
                            dmgValue = String(spells[i].data.data.damage.value[property].value); 
                            dmgtype = String(spells[i].data.data.damage.value[property].type.value);
                            dmgText += dmgValue + " " + dmgtype + "<br>";
                        }
                    }
                }
                //If dmgTypefilter is applied skip the rest of this loop iteration (some kind of weird mechanism to prevent my brain from breaking and looping endlessly over different dmgtypes...)
                if(dmgtypefilter != ""){
                    if (dmgText.includes(dmgtypefilter)){}
                    else{continue;}
                }

                dialogcontent += "<td>" + spelllevel + "</td><td><img style='display:block;' src='" + spells[i].data.img + "' width='20px'>" + spells[i].data.name +"</td><td>"+ spellsavetype +"</td><td>"+savetype+"</td><td>"+dmgText+"</td>";
                dialogcontent += "</tr>";
            }
            dialogcontent += "</table></div>"
        }
        //result dialog... nothing more to say
        new Dialog({
            title:"Your Spell search result:",
            content: dialogcontent,
            buttons: {
                no: {
                  icon: "<i class='fas fa-times'></i>",
                  label: `Thank you good bye :)`
                },
              },
            default: "no"
        }).render(true)

	}
}}).render(true);