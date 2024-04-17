var money = 0;
var checkCouch = false;
var checkfriends1 = false;
var checkfriends2 = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = `key`; 
        this.engine.show(this.engine.storyData.Locations[key].Body); 
        
        if(this.engine.storyData.Locations[key].Choices) { 
            for(let choice of this.engine.storyData.Locations[key].Choices) { 
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
        
        if(this.engine.storyData.Locations[key].Interact) { 
            for(let choice of this.engine.storyData.Locations[key].Interact) { 
                this.engine.interactChoice(choice.InteractOption, choice);
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }

    //poorly coded interactions, but I don't know how to separate these in myStory
    interact(choice) {
        if(choice){
            if(choice.InteractOption == "Check the couch" && checkCouch == false){
                checkCouch = true;
                money += .50;
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show("You checked the couch. You find some money you stashed in case of need-lunch-money emergency. Get: $0.50");
                this.engine.show("&gt; ");
            }
            else if(choice.InteractOption == "Ask your friends for money" && checkfriends1 == false){
                checkfriends1 = true;
                money += .50;
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show("\"Lucky you, I have 50 cents in change from when I got a soda from the vending machine. Don't spend it all in one place.\" Get: $0.50");
                this.engine.show("&gt; ");
            }
            else if(choice.InteractOption == "Pester your friends for money" && checkfriends2 == false){
                checkfriends2 = true;
                money += .50;
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show("\"I mean, I have these two quarters that have been sitting in my bag for like two years. I expect great things from your next purchase.\" Get: $0.50");
                this.engine.show("&gt; ");
            }
            else if(choice.InteractOption == "Buy something at the grocery store" && money >= 1.5){
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show("With $1.50, you can buy some quite a bit, and decide on some vegetables. Quite healthy if I say so, but a little bland. But you got enough to eat for lunch. Congrats on getting lunch!");
                this.engine.gotoScene(End);
                return;
            }
            else if(choice.InteractOption == "Buy something from the vending machine" && money >= 1.5){
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show("With $1.50, you can buy chips or a soda. Neither are particularly healthy nor filling, but it'll be enough for lunch. Congrats on getting lunch!");
                this.engine.gotoScene(End);
                return;
            }
            else{
                this.engine.show("&gt; "+choice.InteractOption);
                this.engine.show(choice.InteractText);
                this.engine.show("&gt; ");
            }
        }
        this.engine.gotoScene(Location, choice.InteractTarget);
    }
}

// class InteractiveLocation extends Location{
//
// }

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');