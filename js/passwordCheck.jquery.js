function PasswordChecker(wrapperId, passwordInputFieldId, passwordSubmitButtonId) {

    //following are attributes which could be seen as "constants"
    this.successClass = "success";
    this.warningClass = "warning";
    this.errorClass = "error";

    this.minLength = 8; //this is what we defined and what we need to consider in our length check

    //this attributes are set with our constructor
    this.wrapperField = $(wrapperId);  //anstatt dem get wird ein dollar zeichen verwendet
    this.passwordField = $(passwordInputFieldId); //anstatt dem get wird ein dollar zeichen verwendet
    this.passwordSubmitButton = $(passwordSubmitButtonId); //anstatt dem get wird ein dollar zeichen verwendet


    var that = this; //a trick because this is a keyword and means different things in a new context! Especially when you work with events or if you call functions outside your class "this" won't mean you!

    //now for the events which should fire:
    //if we leave the password field (focus is lost) - JavaScript Method "onblur" for an input field in our case the field this.passwordField
    //if we enter the password field (focus is set) - JavaScript Method "onfocus" for an input field - again in our case the field this.passwordField
    //if we are in the password field an enter text - JavaScript Method "onkeyup" or "onkeup" - again in our case the field this.passwordField
    //if we try to click the submit button - JavaScript Method "onclick" - in our case this.passwordSubmitButton

    this.passwordField.blur(function() { //nur blur anstatt onblur +function in Klammern
        //the keyword "this" is always referring to its context.
        //onblur is an event which happens in "passwordField" -> so the keyword "this" would refer to the passwordField NOT to our class
        //therefore we previously saved "this" in a variable called "that"
        that.check();
    });

    this.passwordField.keydown(function() { //anderer Name , kein on davor
        that.check();
    });

    this.passwordField.focus(function() { //kein on davor
        that.check();
    });

    this.passwordSubmitButton.click(function() { // " onclick" weggelassen
        that.check();
    });



    this.check = function() {
        //we can only check if every field which with given Id exists
        //one of them would be null if one Id wouldn't exist therefore following statement would fail
        if(this.wrapperField && this.passwordField && this.passwordSubmitButton) {
            var longEnough = this.checkForLength();
            var hasSpecialChars = this.checkForSpecialCharacters();

            //if it is long enough and has a special character - everything is fine
            if(longEnough && hasSpecialChars) {
                this.wrapperField.removeClass(this.warningClass + ' ' + this.errorClass).addClass(this.successClass);
                this.passwordSubmitButton.attr('disabled', false); //viel komplexere Umschreibung des Vergleichs ?
            } else if(!hasSpecialChars && longEnough) { //if it is long enough but it has no special character set class warning
                this.wrapperField.removeClass(this.successClass + ' ' + this.errorClass).addClass(this.warningClass);
                this.passwordSubmitButton.attr('disabled', true);//viel komplexere Umschreibung des Vergleichs ?
            } else { //if it is not long enough set class error
                this.wrapperField.removeClass(this.warningClass + ' ' + this.successClass).addClass(this.errorClass);
                this.passwordSubmitButton.attr('disabled', true);//viel komplexere Umschreibung des Vergleichs ?
            }


        } else {
            //obviously a field is null (we weren't able to find it)
            console.error("A Id given to PasswordChecker doesn't exist!");

            //one could improve this by telling the Developer which Id(s) are null...
        }
    };

    //TODO 2 start
    /*
    This method should return true if the length of passwordField value is greater or equal to this.minLength
     */
    this.checkForLength = function() {
        //@todo
        //have a look at javascript string methods and properties
        return this.passwordField.value.length >= this.minLength; //this needs to be replaced!
    };

    /*
    This method returns true if no special Character "!§$_.:,;" is found in this.password - otherwise false
     */
    this.checkForSpecialCharacters = function() {
        //@todo
        //have a look at javascript string methods and properties
        //you could probably "match" it somehow
        var sonder = /[!§$_.:,;]/;
        return sonder.test(this.passwordField.value); //this needs to be replaced!
    };
    //TODO 2 end
}


