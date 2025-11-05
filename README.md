# tp-node-express

node-ts-curl
Exemple de routes utilisables :

Curl :

Lister tous les contacts : curl http://localhost:3000/contacts

Lister un contact : curl http://localhost:3000/contacts/id

Curl.exe :

Post créer : curl.exe -X POST "http://localhost:3000/contacts" ^ -H "Content-Type: application/json" ^ --data '{"name":"Alice","email":"alice@example.com"}'

Put : curl.exe -X PUT "http://localhost:3000/contacts/1" ^ -H "Content-Type: application/json" ^ --data '{"email":"alice.new@example.com"}'

Get tous et un : curl.exe "http://localhost:3000/contacts" curl.exe http://localhost:3000/contacts/1

Delete : curl.exe -X DELETE http://localhost:3000/contacts/1

Visualiser les options que le serveur prend en charge : curl.exe -v OPTIONS "http://localhost:3000/contacts" 

Alternative :

Post créer: Invoke-RestMethod -Uri "http://localhost:3000/contacts" -Method Post -ContentType "application/json" -Body '{ "name": "Alice", "email": "alice@example.com" }'

Get liste: Invoke-RestMethod -Uri "http://localhost:3000/contacts" -Method Get

Get detail: Invoke-RestMethod -Uri "http://localhost:3000/contacts/1" -Method Get

Put modifier: Invoke-RestMethod -Uri "http://localhost:3000/contacts/1" -Method Put -ContentType "application/json" -Body '{ "email": "alice.new@example.com" }'

Delete: Invoke-RestMethod -Uri "http://localhost:3000/contacts/1" -Method Delete