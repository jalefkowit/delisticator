/*
 * BuzzFeed Delisticator for Chrome
 * Kills listicles dead!
 * Copyright 2013, Jason Lefkowitz <jason@jasonlefkowitz.net>.
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

var re = /\s*\d+\s*/;

var bullshitListicleTaunts = [
    
    "Someone sat down and wrote this. Think about that. AN ACTUAL PERSON SAT DOWN AND WROTE THIS.",
    "More Internet pollution! Oh goodie.",
    "DEAR LORD MAKE IT STOP",
    "Somewhere in an impoverished nation, a twelve-year-old child worked all day to pull this out of the listicle mines.",
    "If you click this link, you will become dumber than you were before you clicked it. YOU HAVE BEEN WARNED.",
    "DID YOU KNOW? 'Listicle' is the Chinese word for 'five minutes you'll never get back.'",
    "Listicles: the Natty Light of online publishing.",
    "The listicles will continue until morale improves.",
    "If your mother knew you read listicles, she would be so disappointed.",
    "If you want to save some time, you could skip this listicle and I'll just hit you on the head with a hammer.",
    "Did they warn you when you borrowed $250,000 for that sociology degree that you'd end up writing these?"
    
]

jQuery('div.PageContainer article, div.Column2 li.small-posts, .partner-area').each(function(index, element) {
    
    hideIfBullshit(element);
    
});

hideIfBullshitInSplash(jQuery('div#splash-container'));

var observer = new MutationSummary({

    callback: handleArticleChanges,
    queries: [
        { element: 'article'} ]
    
});

function handleArticleChanges(summaries) {
    
    var newArticles = summaries[0].added;
    
    newArticles.forEach(function(element, index, array) {
        
        hideIfBullshit(element);
        
    });
    
}

function hideIfBullshitInSplash(splash) {
    
    var headline = jQuery(splash).find('splash-desc');
    var headlineText = headline.html();
    
    if (re.test(headlineText)) {
        
        var randomTaunt = bullshitListicleTaunts[Math.floor(Math.random() * bullshitListicleTaunts.length)];
        
        jQuery(splash).find('label').html('Another bullshit listicle');
        headline.html(randomTaunt);
        jQuery(splash).addClass('bullshit-listicle');
        
    }
    
}

function hideIfBullshit(article) {
  
    var headline = jQuery(article).find(':header a');
    var headlineText = headline.html();
    
    if (re.test(headlineText)) {
        
        headline.html('Another bullshit listicle');
        jQuery(article).addClass('bullshit-listicle');
        
        var randomTaunt = bullshitListicleTaunts[Math.floor(Math.random() * bullshitListicleTaunts.length)];
        var originalHeadline = '<p class="bullshit-listicle-original-headline"><i>Original clickbait headline: ' + headlineText + '</i></p>';
        
        jQuery(article).find(':header').after(originalHeadline);
        
        jQuery(article).find('p.description').html(randomTaunt);
        
        jQuery(article).find('h3').after('<hr class="bullshit-listicle-clear">');
        
        var headlineMargin = jQuery(article).find('h3').css('margin-left');
        jQuery(article).find('p.bullshit-listicle-original-headline').css('margin-left', headlineMargin);
        
        
    } 
    
}
