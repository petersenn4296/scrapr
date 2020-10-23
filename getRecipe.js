document.getElementById("getRecipe").addEventListener('click', () => {

    function searchDOMForRecipe() {
        const recipe_selectors = [
            //used
            '.wprm-recipe-container',
            // '.recipe-content',
            // '.tasty-recipes',
            //unused
            // '.recipe-callout',
            // '.easyrecipe',
            // '.innerrecipe',
            // '.recipe-summary.wide', // thepioneerwoman.com
            // '.simple-recipe-pro',
            // '.mv-recipe-card',
            // 'div[itemtype="http://schema.org/Recipe"]',
            // 'div[itemtype="https://schema.org/Recipe"]',
        ]

        let notes
        let ingredients
        let instructions 
        recipe_selectors.every(s => {
            let recipeContainerInDOM = document.querySelector(s);
            
            //word press --- (minalmist baker, hot for food)
            if (recipeContainerInDOM && s === '.wprm-recipe-container'){
                // recipe content found, set notes, ingredients, and instructions
                //NOTES
                notes = recipeContainerInDOM.querySelector('.wprm-recipe-notes-container')

                //INGREDIENTS
                const ingredientsNodes = recipeContainerInDOM.querySelectorAll('.wprm-recipe-ingredient-group')
                ingredients = [...ingredientsNodes].map(ingredient => {
                    return ingredient.innerText
                })

                //INSTRUCTIONS
                const instructionsNode = recipeContainerInDOM.querySelector('.wprm-recipe-instruction-group')
                instructions = instructionsNode.innerHTML

                // recipe content found, stop iterating through recipe_selectors
                return false;
            }

            //TODO - set recipe data from more recipe sites
            //tasty recipes --- (choosing chia)
            // if (recipeContainerInDOM && s === '.tasty-recipes'){
            //     console.log('tasty recipes');
            //     console.log(recipeContainerInDOM);

            //     // recipe content found, set notes, ingredients, and instructions
            //     notes = recipeContainerInDOM.querySelector('.tasty-recipes-notes')
            //     ingredients = recipeContainerInDOM.querySelector('.tasty-recipes-ingredients')
            //     instructions = recipeContainerInDOM.querySelector('.tasty-recipes-instructions')

            //     // recipe content found, stop iterating through recipe_selectors
            //     return false;
            // }

            // //recipe content(???) --- (avant garde)
            // if (recipeContainerInDOM && s === '.recipe-content'){
            //     // recipe content found, set notes, ingredients, and instructions
            //     ingredients = recipeContainerInDOM.querySelector('.recipe-ingredients')
            //     instructions = recipeContainerInDOM.querySelector('.recipe-method')

            //     // recipe content found, stop iterating through recipe_selectors
            //     return false;
            // }


            // recipe content NOT found, keep iterating through recipe_selectors
            return true;
        });

        console.log('notes', notes);
        console.log('ingredients', ingredients);
        console.log('instructions', instructions);

        //Send notes, ingredients, instructions to API
    }

    chrome.tabs.executeScript({
        code: '(' + searchDOMForRecipe + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        console.log('Popup script:')
        console.log(results[0]);
    });
});