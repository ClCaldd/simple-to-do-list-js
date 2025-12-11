const fs = require('fs');
const { randomUUID } = require('crypto');

const json_path = './data.json'


let uuid = null
let title = null
let description = null
let status = null
let index = null


// ======================================================================================= FUNCTIONS ================================================================
const error = (text) => {
    console.log("\x1b[31m"+text+"\x1b[0m");
}
const success = (text) => {
    console.log("\x1b[32m"+text+"\x1b[0m");
}

const pending = (text) => {
    console.log("\x1b[33m"+text+"\x1b[0m");
}
const finish = (text) => {
    console.log("\x1b[34m"+text+"\x1b[0m");
}
// ================================================================================================================================================================



let data = {};
if (fs.existsSync(json_path))
    try
    {
        data = JSON.parse(fs.readFileSync(json_path, 'utf8'))
    }
    catch
    {
        fs.writeFileSync(json_path, JSON.stringify(data, null, 2), 'utf8');    
    }
else
    fs.writeFileSync(json_path, JSON.stringify(data, null, 2), 'utf8')





if(data.todos === undefined)
    data.todos = []



const args = process.argv.slice(2);
const type = args[0];

switch(type)
{
    case 'add':
        if(args.length !== 3)
        {
            error('Invalid args!')
            return
        }

        uuid = randomUUID()
        title = args[1]
        description = args[2]
        status = "PENDING"
        let exists = data.todos.some(t => t.title.toLowerCase().trim() === title.toLowerCase().trim() && t.disabled_at === null)
        if(exists)
        {
            error('There is already a to do task current open for this!')
            return
        }

        let new_todo = {};
        new_todo.uuid = uuid
        new_todo.title = title
        new_todo.description = description
        new_todo.status = status
        new_todo.disabled_at = null
        new_todo.created_at = new Date()
        
        data.todos.push(new_todo)
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('| '+ new_todo.uuid +' | '+ '\t\t\t' + '\x1b['+(new_todo.title.length+1)+'D' + new_todo.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(new_todo.description.length)+'D' +  new_todo.description +' | '+'\t\t' +  '\x1b['+(new_todo.status.length+1)+'D' + new_todo.status +'|')
        console.log('+======================================+========================+========================================================================+=============+')
        success('[ADDED]')
        break
    
    case 'remove':
        if(args.length !== 2)
            return
        uuid = args[1]
        index = data.todos.findIndex(t => t.disabled_at === null && (t.uuid === uuid || t.title == uuid))
        if(index === -1)
        {
            error('UUID not valid!')
            return
        }

        const todo_remove = data.todos[index]
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('| '+ todo_remove.uuid +' | '+ '\t\t\t' + '\x1b['+(todo_remove.title.length+1)+'D' + todo_remove.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo_remove.description.length)+'D' +  todo_remove.description +' | '+'\t\t' +  '\x1b['+(todo_remove.status.length+1)+'D' + todo_remove.status +'|')
        console.log('+======================================+========================+========================================================================+=============+')
        success('[REMOVED]')

        
        data.todos[index].disabled_at = new Date()
        break

    case 'list':
        if(args.length !== 1)
        {
            error('Invalid args!')
            return
        }
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('|                UUID                  |         Title          |                           Description                                  |    Status   |')
        console.log('+======================================+========================+========================================================================+=============+')
        data.todos.forEach(todo => {
            if(todo.disabled_at === null)
                console.log('| '+ todo.uuid +' | '+ '\t\t\t' + '\x1b['+(todo.title.length+1)+'D' + todo.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo.description.length)+'D' +  todo.description +' | '+'\t\t' +  '\x1b['+(todo.status.length+1)+'D' + todo.status +'|')
        });
        console.log('+======================================+========================+========================================================================+=============+')
        break

    case 'listfinished':
        if(args.length !== 1)
        {
            error('Invalid args!')
            return
        }
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('|                UUID                  |         Title          |                           Description                                  |    Status   |')
        console.log('+======================================+========================+========================================================================+=============+')
        data.todos.forEach(todo => {
            if(todo.disabled_at === null && todo.status === 'OK')
                console.log('| '+ todo.uuid +' | '+ '\t\t\t' + '\x1b['+(todo.title.length+1)+'D' + todo.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo.description.length)+'D' +  todo.description +' | '+'\t\t' +  '\x1b['+(todo.status.length+1)+'D' + todo.status +'|')
        });
        console.log('+======================================+========================+========================================================================+=============+')
        break


    case 'listpending':
        if(args.length !== 1)
        {
            error('Invalid args!')
            return
        }
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('|                UUID                  |         Title          |                           Description                                  |    Status   |')
        console.log('+======================================+========================+========================================================================+=============+')
        data.todos.forEach(todo => {
            if(todo.disabled_at === null && todo.status === 'PENDING')
                console.log('| '+ todo.uuid +' | '+ '\t\t\t' + '\x1b['+(todo.title.length+1)+'D' + todo.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo.description.length)+'D' +  todo.description +' | '+'\t\t' +  '\x1b['+(todo.status.length+1)+'D' + todo.status +'|')
        });
        console.log('+======================================+========================+========================================================================+=============+')
        break

    case 'pending':
        if(args.length !== 2)
        {
            error('Invalid args!')
            return
        }
        uuid = args[1]
        index = data.todos.findIndex(t => t.disabled_at === null && (t.uuid === uuid || t.title == uuid))
        if(index === -1)
        {
            error('UUID not valid!')
            return
        }

        data.todos[index].status = 'PENDING'
        const todo_pending = data.todos[index]
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('| '+ todo_pending.uuid +' | '+ '\t\t\t' + '\x1b['+(todo_pending.title.length+1)+'D' + todo_pending.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo_pending.description.length)+'D' +  todo_pending.description +' | '+'\t\t' +  '\x1b['+(todo_pending.status.length+1)+'D' + todo_pending.status +'|')
        console.log('+======================================+========================+========================================================================+=============+')
        pending('[PENDING]')
        break

    case 'finish':
        if(args.length !== 2)
        {
            error('Invalid args!')
            return
        }
        uuid = args[1]
        index = data.todos.findIndex(t => t.disabled_at === null && (t.uuid === uuid || t.title == uuid))
        if(index === -1)
        {
            error('UUID not valid!')
            return
        }

        data.todos[index].status = 'OK'
        const todo_finish = data.todos[index]
        console.log('+======================================+========================+========================================================================+=============+')
        console.log('| '+ todo_finish.uuid +' | '+ '\t\t\t' + '\x1b['+(todo_finish.title.length+1)+'D' + todo_finish.title + ' | ' + '\t\t\t\t\t\t\t\t\t' +  '\x1b['+(todo_finish.description.length)+'D' +  todo_finish.description +' | '+'\t\t' +  '\x1b['+(todo_finish.status.length+1)+'D' + todo_finish.status +'|')
        console.log('+======================================+========================+========================================================================+=============+')
        finish('[FINISHED]')
        break
    
    default:
        error('command not found!')
        break
}



fs.writeFileSync(json_path, JSON.stringify(data, null, 2), 'utf8');
