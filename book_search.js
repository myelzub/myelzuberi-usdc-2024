/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var results = {
        "SearchTerm": "",
        "Results": []
    };
    
    results.SearchTerm = searchTerm;
    
    /** Search through each book. */
    for(let i = 0; i < scannedTextObj.length; i++){
        let book = scannedTextObj[i];
         
        /** Search through each scanned text of a book. */
        for(let j = 0; j < book.Content.length; j++){
            let text1 = book.Content[j].Text;
            let text1_includes = text1.includes(searchTerm);
            let text1_split = text1.split(" ")
            let text1_first_word = text1_split[0]
            let text1_last_word = text1_split[text1_split.length - 1];
             
            /** Determine whether the searchTerm continues from text1 to text2. */
            let text2_first_word= "";
            if (j+1 < book.Content.length){
                if(book.Content[j+1].Line == book.Content[j].Line+1 || (book.Content[j+1].Page == book.Content[j].Page+1 && book.Content[j+1].Line == 1)){
                    let text2 = book.Content[j+1].Text.split(" ");
                    text2_first_word = text2[0];
                }
            }
             
            let text1_2 = false;
            if((text1_last_word + text2_first_word) == searchTerm || (text1_last_word.substring(0, text1_last_word.length-1) + text2_first_word) == searchTerm){
                text1_2 = true;
            }
             
            /** Determine whether the searchTerm continues from text0 to text1. */
            let text0_last_word= "";
            if (j-1 >= 0){
                if(book.Content[j-1].Line == book.Content[j].Line-1 || (book.Content[j-1].Page == book.Content[j].Page-1 && book.Content[j].Line == 1)){
                    let text0 = book.Content[j-1].Text.split(" ");
                    text0_last_word = text0[text0.length - 1];
                }
            }
             
            let text0_1 = false;
            if((text0_last_word + text1_first_word) == searchTerm || (text0_last_word.substring(0, text0_last_word.length-1) + text1_first_word) == searchTerm){
                text0_1 = true;
            }
            
            /** If the searchTerm is fully or partially contained in a text, add the ISBN, Page, and line of the text to Results. */
            if(text1_includes || text0_1 || text1_2){
                results.Results.push({
                    "ISBN": book.ISBN,
                    "Page": book.Content[j].Page,
                    "Line": book.Content[j].Line
                });
            }
        }
    }
    
    return results;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object for search term "the". */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object with empty list of results. */
const emptyResultsOut = {
    "SearchTerm": "hair",
    "Results": []
}

/** Example output object for capitalized search term "The" */
const twentyLeaguesCaseOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/** Example output object for search term with hyphenated word break */
const twentyLeaguesHyphenatedBreakOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object for hyphenated search term continued on two lines */
const twentyLeaguesHyphenatedOut = {
    "SearchTerm": "dark-ness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesAdditionalOut = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a match. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We can check that, given a known input, we do not get a match. */
const test3result = findSearchTermInBooks("hair", twentyLeaguesIn);
if (JSON.stringify(emptyResultsOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", emptyResultsOut);
    console.log("Received:", test3result);
}

/** We can check that, given a known input, the output is case sensitive. */
const test4result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesCaseOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesCaseOut);
    console.log("Received:", test4result);
}

/** We can check that, given a known input, if the search term has a hyphenated word break, the output returns both lines containing the word. */
const test5result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesHyphenatedBreakOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesHyphenatedBreakOut);
    console.log("Received:", test5result);
}

/** We can check that, given a known input, if the search term is hyphenated and is continued on two lines, the output returns both lines containing the word. */
const test6result = findSearchTermInBooks("dark-ness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesHyphenatedOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", twentyLeaguesHyphenatedOut);
    console.log("Received:", test5result);
}

/** We can check that, given a known input, the function finds the search term even if the scanned term string contains additional characters */
const test7result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesAdditionalOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesAdditionalOut);
    console.log("Received:", test7result);
}
