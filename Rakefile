desc 'Push updates to grekko.de github repository'
task :push do
  sh 'git checkout gh-pages'
  sh 'git rebase master'
  sh 'git push -u origin gh-pages'
  sh 'git co master'
end
