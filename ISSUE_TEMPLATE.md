**Brightfind Front-end Code Review Checklist**


PROCESSES: Does project adhere to?

- [ ] frontend git version control processes
- [ ] method for backend developer syncing CSS?
- [ ] method for the backend developer syncing JS?
- [ ] method for providing a JS file into which backend developers can add scripts?
- [ ] method for incorporating backend-authored scripts back into the frontend repo?
- [ ] method for illustrating diffs in github for HTML changes?
- [ ] does gitignore properly exclude node_modules?



BUILD

- [ ] Is the project based on the front-end Webpack appseed?
- [ ] Is project free of any non-node dependencies (e.g. Jekyll is a Ruby gem)
- [ ] Is there a package JSON file?
- [ ] Is there an index directory page?



ACCESSIBILITY

- [ ] Skiplinks?
- [ ] Alt text required?



PERFORMANCE

- [ ] Does the page download less than 1.5MB on load?
- [ ] Are images lazy-loaded?
- [ ] Is adaptive imaging used to give mobile devices leaner images?
- [ ] Orphan code removed
- [ ] Does the document head have prefetch links?
- [ ] CDN usage?
- [ ] GZIP? [done on backend, but frontend must always ask]
- [ ] Imaging caching? [done on backend, but frontend must always ask]
- [ ] AUDIT: Google Page Speed Insight results
- [ ] AUDIT: WebpageTest results



JAVASCRIPT

- [ ] Does the page have any global variables?
- [ ] Is all the JS properly bundled, including scripts taken from the backend "input" file?
- [ ] Are functions named?
- [ ] Does the JS contain any CSS manuipulations, rather than mere adding/removing classes?
- [ ] No console errors
- [ ] No on-page scripts
- [ ] Verifed that "eval" isn't used in any JS anywhere(backend code and plugins)?
- [ ] No big libraries for small features



SASS/CSS

- [ ] Is SASS well organized?
- [ ] is SASS relatively flat (rarely more than 3 levels deep)?
- [ ] Is the gulp recipe outputting compressed CSS?
- [ ] Is BEM being used?
- [ ] No IDs in CSS
- [ ] Does the project use Flexbox?
- [ ] Is there a print css?
- [ ] Does the project mainly use EMs and REMs instead of pixels?
- [ ] Are line-heights unitless?
- [ ] Are font-sizes and line-heights being set as variables?
- [ ] Are breakpoints set with variables?
- [ ] Is "!important" avoided?
- [ ] Is the project avoiding big libraries (like Bootstrap) and wasted css?



HTML

- [ ] Use of semantic elements where appropriate?
- [ ] Presentational classes avoided?
- [ ] document <head> check
- [ ] Scripts list check
- [ ] Do the content areas properly allow for the presense or absense of <p> tags?



WEB TYPOGRAPHY

- [ ] Are there fewer than 4 total font faces? [FontAweight1, FontAweight2, FontBweight1, FontBweight2
- [ ] Is there a fallback font-stack?
- [ ] AUDIT: FLOUT at 3g speed?
- [ ] If Typekit, async?
- [ ] Local? (preference is to use an external reference)
- [ ] Ensure not using Glyphicons AND fontawesome (very common mistake, as BS includes Glyphicons)
- [ ] Avoiding big icons fonts when they aren't needed?
- [ ] Scripts list check



IMAGES

- [ ] Are images well organized in folders
- [ ] No overly large images? [even if fake content]
- [ ] Images progressive?
- [ ] SVGs used where appropriate
- [ ] Background images manageable through CMS where appropriate?
- [ ] Lazy Load check is in the performance section
- [ ] Using picture element or src set? (preference is for picture element -- srcset can be used in conjuntion)




PRELAUNCH

- [ ] Is project cleared of old/unused files?
- [ ] 404 page
- [ ] Favicon
- [ ] Easter
- [ ] Lazy Load check is in the performance section
- [ ] Using picture element or src set? (preference is for picture element -- srcset can be used in conjuntion)
- [ ] Image Specification Document
