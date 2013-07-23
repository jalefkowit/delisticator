BuzzFeed Delisticator
============

BuzzFeed Delisticator for Google Chrome is a simple Chrome extension that makes all the listicles on the BuzzFeed home page less visually prominent, so you can skip them more easily.

It's a pretty simple bit of code, but I'm sharing it on the off chance it's ever useful for others learning how to write Chrome extensions. It's licensed under the GNU General Public License version 3.

This extension uses [the Mutation Summary library](https://code.google.com/p/mutation-summary/) to take advantage of the new-ish DOM Mutation Observers API, which makes dealing with content that's streamed into the page after loading much easier. My thanks go out to the developers of that library.
