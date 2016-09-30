(function(window, $) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var headerTemplate = "<li><h4>__LETTER__</h4></li>";
    var contactTemplate = "<li class='media'><div class='media-left'><a href='#'><img class='media-object img-circle contact-photo' src='__AVATAR__' /></a></div><div class='media-body'><h4 class='media-heading'>__NAME__</h4>__TITLE__<div class='btn-group pull-right' role='group'><a href='#' data-toggle='modal' data-target='#contactDetail' class='btn btn-default'><span class='fa fa-eye'></span></a><a href='contactForm.html' class='btn btn-default'><span class='fa fa-pencil'></span></a><a href='#' class='btn btn-default'><span class='fa fa-trash'></span></a></div></div></li><hr>";
    
    //Function to render contacts
    function renderContacts(data) {
        //Get first letter to start
        var idx = alphabet.indexOf(data[0].firstname.charAt(0));
        var letter = alphabet.charAt(idx);

        //Append first letter header
        $("ul#contactsContainer").append(headerTemplate.replace("__LETTER__", letter));

        //Traverse contact data
        data.forEach(function(item) {
            var nameLetter = item.firstname.charAt(0);
            //If name letter and header letter are not equal must forward idx to next letter
            if (nameLetter !== letter) {
                while(nameLetter !== letter) {
                    idx++;
                    letter = alphabet.charAt(idx);
                }

                //Append letter header
                $("ul#contactsContainer").append(headerTemplate.replace("__LETTER__", letter));
            }
            //Append contact entry
            $("ul#contactsContainer").append(contactTemplate.replace("__NAME__", item.firstname+" "+item.lastname).replace("__TITLE__", item.jobTitle).replace("__AVATAR__", item.avatar));
        });
    };
    
    $.get("mocks/MOCK_DATA.json")
        .done(function(data) {
            //Limit data returned
            data.splice(0, 900);
            
            //Sort data alphabetically by firstname
            data.sort(function(a, b) {
                var x = a.firstname;
                var y = b.firstname;
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
        
            renderContacts(data);
        });
    
})(window, $)