'use strict';

// EXPOSED METHODS

// creates an intent entry
function intentCreate (entry) {

  // Commit post entry to my source chain
  var hash = commit('intent', entry);

  // On the DHT, put a link from my hash to the hash of the new post
  var base = commit("intents_anchor", "intents_anchor");
  commit("intent_link",{
    Links:[
      {Base:base, Link: hash, Tag: "intent"}
    ]
  });

  // Returns the hash of the new post to the caller
  return hash;
}

// retrieves a holoWorldEntry entry
function intentRead (hash) {
  return get(hash)
}

function getAllIntents () {
    var base = commit("intents_anchor", "intents_anchor");
    var links = [];
    try {
        links = getLinks(base, 'intent', { Load: true });
    }
    catch (error)
    {
        
    }
    return links;
}

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis() {
  return true;
}

// -----------------------------------------------------------------
//  validation functions for every DHT entry change
// -----------------------------------------------------------------

function validateCommit (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case 'intent':
      // in order for the 'commit' action to work, validateCommit (given a intent) must return true
      // there is no special validation that we have to perform for our simple app
      return true
    case 'intents_anchor':
      // in order for the 'commit' action to work, validateCommit (given a intents_anchor) must return true
      // there is no special validation that we have to perform for our simple app
      return true
    case 'intent_link':
      // in order for the 'commit' action to work, validateCommit (given a intent_link) must return true
      // there is no special validation that we have to perform for our simple app
      return true
    default:
      // invalid entry name
      return false
  }
}

function validateLink(linkEntryType, baseHash, links, pkg, sources )
{
  if (linkEntryType=="intent_link")
    return true;

  return false;

}

function validatePut (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case 'intent':
      return true
    default:
      // invalid entry name
      return true
  }
}

function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return false;
    default:
      // invalid entry name
      return false;
  }
}

function validateDel (entryName,hash, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return false;
    default:
      // invalid entry name
      return false;
  }
}

function validatePutPkg (entryName) {
  return null;
}
function validateModPkg (entryName) {
  return null;
}
function validateDelPkg (entryName) {
  return null;
}
