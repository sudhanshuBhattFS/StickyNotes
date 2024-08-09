


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "start") {
            const noteData = request.noteData
            createCardAndUpdate(noteData);
            sendResponse({ status: "success" });

        }

        // rename -- note 
        if (request.message === "injectPopUps") {
            injectCards(request.noteData)
            sendResponse({ status: "success" });
        }

        if (request.action === "removeElementFromDom") {
            const id = request.id
            SimpleShadowDOM.removeElementFromDom(id)
        }

        if (request.message === "hideStickyNotes") {
            const isHidden = request.isHidden

            if (isHidden === true) {
                SimpleShadowDOM.hideAllElementsFromDom()
            } else {
                SimpleShadowDOM.showAllElementsFromDom()
            }
        }

        if (request.action === "updateContentInCard") {
            const noteData = request.note
            createCardAndUpdate(noteData)
        }

        if (request.message === 'updatePinInContentScript') {
            const updatePin = request.isPinEnable
            const noteId = request.id

            chrome.runtime.sendMessage({ action: "enablePin", isPinEnable: updatePin, id: noteId });

            SimpleShadowDOM.updatePin(noteId)
            // we can get all the details from the localstroage but right now we can use id 


        }
    }
);








