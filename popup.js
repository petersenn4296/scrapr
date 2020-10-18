document.getElementById("getSource").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function searchDOMForRecipe() {
        const recipe_selectors = [
            '.recipe-callout',
            '.tasty-recipes',
            '.easyrecipe',
            '.innerrecipe',
            '.recipe-summary.wide', // thepioneerwoman.com
            '.wprm-recipe-container',
            '.recipe-content',
            '.simple-recipe-pro',
            '.mv-recipe-card',
            'div[itemtype="http://schema.org/Recipe"]',
            'div[itemtype="https://schema.org/Recipe"]',
        ]

        let recipeInfo
        recipe_selectors.every(s => {
            let recipeContainerInDOM = document.querySelector(s);
            if (recipeContainerInDOM){
                // it worked, stop iterating through recipe_selectors
                recipeInfo = recipeContainerInDOM
                return false;
            }
            return true;
        });

        console.log('recipeInfo', recipeInfo);
    }

    chrome.tabs.executeScript({
        code: '(' + searchDOMForRecipe + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });
});