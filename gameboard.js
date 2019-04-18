class Gameboard{
    constructor( sourceResources, sourceBuildings, sourceTokens ){
        this.sourceResources = sourceResources;
        this.sourceBuildings = sourceBuildings;
        this.sourceTokens = sourceTokens;
        this.buildings = {
            building1: null,
            building2: null,
            building3: null
        };
        this.checkRequirements = this.checkRequirements.bind(this);
        this.shuffle( this.sourceBuildings );
        this.dealBuildingCards();
    }

    shuffle( thingToShuffle ){
        for( var cardI = thingToShuffle.length-1; cardI>0; cardI--){
            var randomIndex = Math.floor(Math.random() * cardI);
            var temp = thingToShuffle[randomIndex];
            thingToShuffle[randomIndex] = thingToShuffle[cardI];
            thingToShuffle[cardI] = temp;
        }
    }

    dealBuildingCards(){
        this.buildings.building1 = this.sourceBuildings.pop();
        this.buildings.building2 = this.sourceBuildings.pop();
        this.buildings.building3 = this.sourceBuildings.pop();
    }

    addBuildingsToDom(){
        for (var building in this.buildings) {
            var resources = '';
            var req = this.buildings[building].requirements;
            for (var x in req){
                resources = x;
            }
            
            var pointVal = $('<div>').text('Points: ' + this.buildings[building].points);
            var requirements = $('<div>').text('Requires: ' + resources);

            var newDiv = $('<div>')
            .addClass('babyDiv')
            .css({'background-color': 'green', 'height': '100%'})
            .append(pointVal, requirements)
            $('.'+building).append(newDiv);
        }
    }

    checkRequirements( player , building ){

        var buildingReq = this.buildings[building].requirements;
        for (var key in buildingReq){
            if (buildingReq[key] > player.storage[key]){
                console.log(false);
                return false;
            }
        }

        return this.buildings[building];
        //if all true, start to decrement player storage as required
        //increment victory points
        //increment building made
        // decrement pioneers
        // change bulding to null
        //return resources to board

    }

    resetBuildingCards(){
        console.log('initial', this.buildings);
        for (var key in this.buildings){
            if (this.buildings[key] === null){
                this.buildings[key] = this.sourceBuildings.pop();
            }
        }
        
    }




}