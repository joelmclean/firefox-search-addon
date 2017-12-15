
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
	/* Stuff here */

	    });
}

function resetDefaultSuggestion() {
  browser.omnibox.setDefaultSuggestion({
	  description: 'Search Addon: '
  });
}

resetDefaultSuggestion();

browser.omnibox.onInputChanged.addListener(function(text, suggest) {
	browser.omnibox.SuggestResult({'description': text});
});

browser.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(text) {
	var url = findURL(text);
if( url != ''){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.update(tabs[0].id, {url: url});
  });
	}
else	{
	var querying = browser.tabs.query({currentWindow: true});
	querying.then(function(tabs){
		for (let tab of tabs) {
	   	 // tab.url requires the `tabs` permission
  			  console.log(tab.url);
 			 }
		console.log("tab url is::::"+tabs.url);
		}, null);
	}
}

browser.omnibox.onInputEntered.addListener(function(text) {
	navigate(text);
});

function findURL(text){
	var parts = text.split(" ");
	var partOne = parts[0];
	var searchURLprefix = findSearchEnginePrefix(partOne);
	var searchURLsuffix = findSearchEngineSuffix(partOne);

	console.log("Search URL "+searchURLprefix);
	if(searchURLprefix == ''){
		return '';
	}
	if(searchURLsuffix == ''){
		return '';
	}
	console.log(searchURLprefix);
	console.log(searchURLsuffix);
	var  queryParts = [];


	parts.forEach(part => {
		if (parts.indexOf(part) != 0) {
			queryParts.push(part);
		}
	});

	query = queryParts.join(' ');
	console.log(queryParts);
	
	return searchURLprefix+query+searchURLsuffix;
}

function findSearchEnginePrefix(searchEngText){
	
	if(searchEngText == 'wiki'){
		return 'https://wikipedia.org/wiki/Search?search=';
	}
	else if(searchEngText == 'g'){
		return 'https://www.google.co.in/search?q=';
	}
	else if(searchEngText == 'b'){
		return 'http://www.bing.com/search?q=';
	}
	else if(searchEngText == 'duck'){
		return 'https://duckduckgo.com/?q=';
	}
	else if(searchEngText == 'y'){
		return 'https://www.youtube.com/results?search_query=';
	}
	else if(searchEngText == 't'){
        return 'https://twitter.com/search?q=';
    }
	else if(searchEngText == 'gh'){
        return 'https://github.com/search?q=';
    }
	else if(searchEngText == 'ya'){
        return 'https://www.yandex.com/search/?text=';
    }
	else if(searchEngText == 'wp'){
        return 'https://en.search.wordpress.com/?src=organic&q=';
    }
	else if(searchEngText == 'a'){
        return 'https://www.amazon.com/s/field-keywords=';
    }
	else if(searchEngText == 's'){
		return 'https://stackoverflow.com/search?q=';
	}
	else if(searchEngText == 'abn'){
		return 'https://www.abr.business.gov.au/SearchByAbn.aspx?SearchText=';
	}
	else if(searchEngText == 'w'){
		return 'http://kickstart.micron21.com/tools/whois.php?host=';
	}
	else if(searchEngText == 'd'){
		return 'http://kickstart.micron21.com/tools/dig.php?host=';
	}
	return '';
}

function findSearchEngineSuffix(searchEngText){
	
	if(searchEngText == 'wiki'){
		return '';
	}
	else if(searchEngText == 'g'){
		return '';
	}
	else if(searchEngText == 'b'){
		return '';
	}
	else if(searchEngText == 'duck'){
		return '';
	}
	else if(searchEngText == 'y'){
		return '';
	}
	else if(searchEngText == 't'){
                return '';
        }
	else if(searchEngText == 'gh'){
                return '';
        }
	else if(searchEngText == 'ya'){
                return '';
        }
	else if(searchEngText == 'wp'){
                return '';
        }
	else if(searchEngText == 'a'){
                return '';
        }
	else if(searchEngText == 's'){
		return '';
	}
	else if(searchEngText == 'abn'){
		return '';
	}
	else if(searchEngText == 'w'){
		return '&server=default';
	}
	else if(searchEngText == 'd'){
		return '&record=any';
	}
	return '';
}

function findSearchName(searchEngText){

        if(searchEngText == 'wiki'){
                return 'wiki';
        }
        else if(searchEngText == 'g'){
                return 'google';
        }
        else if(searchEngText == 'b'){
                return 'bing';
        }
        else if(searchEngText == 'duck'){
                return 'duckduckgo';
        }
        else if(searchEngText == 'y'){
                return 'youtube';
        }
        else if(searchEngText == 't'){
                return 'twitter';
        }
        else if(searchEngText == 'gh'){
                return 'github';
        }
        else if(searchEngText == 'ya'){
                return 'yandex';
        }
        else if(searchEngText == 'wp'){
                return 'wordpress';
        }
        else if(searchEngText == 'a'){
                return 'amazon';
        }
        else if(searchEngText == 's'){
                return 'stackoverflow';
        }
	else if(searchEngText == 'abn'){
		return 'business-search';
	}
	else if(searchEngText == 'w'){
		return 'whois';
	}
	else if(searchEngText == 'd'){
		return 'dig';
	}
        return '';
}


function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/search-addon.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
