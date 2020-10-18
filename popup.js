document.getElementById("getSource").addEventListener('click', () => {

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

        let notes
        let ingredients
        let instructions 
        recipe_selectors.every(s => {
            let recipeContainerInDOM = document.querySelector(s);
            
            //word press --- (minalmist baker, hot for food)
            if (recipeContainerInDOM && s === '.wprm-recipe-container'){
                // recipe content found, set notes, ingredients, and instructions
                notes = recipeContainerInDOM.querySelector('.wprm-recipe-notes-container')
                ingredients = recipeContainerInDOM.querySelectorAll('.wprm-recipe-ingredient-group')
                instructions = recipeContainerInDOM.querySelectorAll('.wprm-recipe-instruction-group')

                // recipe content found, stop iterating through recipe_selectors
                return false;
            }

            //tasty recipes --- (choosing chia)
            if (recipeContainerInDOM && s === '.tasty-recipe'){
                // recipe content found, set notes, ingredients, and instructions
                // notes = recipeContainerInDOM.querySelector('.wprm-recipe-notes-container')
                // ingredients = recipeContainerInDOM.querySelectorAll('.wprm-recipe-ingredient-group')
                // instructions = recipeContainerInDOM.querySelectorAll('.wprm-recipe-instruction-group')

                // recipe content found, stop iterating through recipe_selectors
                return false;
            }

            //recipe content(???) --- (avant garde)
            if (recipeContainerInDOM && s === '.recipe-content'){
                // recipe content found, set notes, ingredients, and instructions
                // notes = recipeContainerInDOM.querySelector('.wprm-recipe-notes-container')
                // ingredients = recipeContainerInDOM.querySelectorAll('.wprm-recipe-ingredient-group')
                // instructions = recipeContainerInDOM.querySelectorAll('.wprm-recipe-instruction-group')
            
                // recipe content found, stop iterating through recipe_selectors
                return false;
            }

            //TODO - set recipe data from more recipe sites

            // recipe content NOT found, keep iterating through recipe_selectors
            return true;
        });

        console.log('notes', notes);
        console.log('ingredients', [...ingredients]);
        console.log('instructions', [...instructions]);

    }

    chrome.tabs.executeScript({
        code: '(' + searchDOMForRecipe + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        console.log('Popup script:')
        console.log(results[0]);
    });
});