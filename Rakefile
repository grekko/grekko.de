desc 'Push updates to github pages: grekko.de'
task :push do
  sh 'git checkout gh-pages'
  sh 'git rebase master'
  sh 'git push -u origin gh-pages'
  sh 'git co master'
end
