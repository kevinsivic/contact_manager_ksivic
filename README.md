# README

## How to run
First build the docker image: \
`docker buildx build -t contact_manager_ksivic .`

Then run the container using that image: \
`docker run -d -p 80:3000 -e RAILS_MASTER_KEY=5c6099359916c7f3a433ec78f25f8f42 --name contact_manager_ksivic contact_manager_ksivic`

> This key generally should not be shared in the code repo. Only sharing here due to the nature of the repo.

## Notes
I created a solution using Ruby on Rails and a React frontend.

### Typo-Tolerant Search
The solution handles fuzzy/typo-tolerant search using a levenshtein distance calculation. This was a decent first
attempt, but I'm not particularly happy with the experience, especially when searching for email addresses. In a 
production app I likely would have looked into using [FTS5](https://www.sqlite.org/fts5.html) for it full text search 
functionality if this was intended to continue with a SQLite database or something like SOLR/Lucene for a more robust
and scalable solution.

In order to make the levenshtein method work reasonably well for names I had to split the names by spaces to approximate
a first/last name search separately. This worked ok, but it may have been better to create separate fields for first and
last names. I could have done something similar with email addresses and split by the `@` symbol to allow a search by
either the domain or local portion of the email.

I also used the levenshtein distance as a secondary search while the primary search used an exact match method.

### UI
The UI was built in react, it was fairly straightforward and there are a few improvements I would make.
1. The Create Contact screen being separate from the rest of the app is awkward. That component should probably just
be on the same page as everything else.
2. The layout is terrible, I spent no time styling the app and it's really just a mess. I believe the markup is setup
in a way that would make it relatively easy to style.
3. The code organization in the React app could use some improvement. It's not a problem with such a small app but
would quickly get out of hand fairly quickly as more features were added.

### Interesting notes
You can check the git history to see the path I took to solve the problem. I used micro-commits and included a commit
for each step that I took.
