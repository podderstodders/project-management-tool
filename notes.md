Board
    boardname: 
    isFavorite: boolean
	description: string
	List[]:
	
		Card:
			title:
			description?: string 
			members?: MemberIds[]
			labels: [
				{
					labelTitle?: '',
					labelColor: '',
					labelIndex: -1
				}
			].length === 5
			
			checklist: [
				{
					checklistitemindex: -1, 
					checklistitemvalue: '',
					checklistitemactive: false  
				}
			]
			
			//aesthetic purposes 
			cover: {isActive: boolean, color: ''}


using useReducer? 



instead of using useState, or actually saving useState for internal component things, like input change handlers.

the first thing i do is go to boardcontext, and add a new action. 

I need to add the case for updating a list item, using the AbsoluteEditCard component in BoardContainer. 

I'll be updating the title, i have the the card, its cardId, and the new title.

so my onSubmit within the this component would just be constructing a new card from the existing card, but the title would be different. 

back to boardcontext, i would add a boardAction

{type: 'UPDATE_CARD', payload: {boardName: string, listName: string, card: cardPayload}}

thne in my boardReducer 

add the case: 

case 'UPDATE_CARD':
	return {...state, boards: state.boards.map( (board) => 
												board.boardName === action.payload.boardName ? {...board, lists: board.lists.map( list => list.listName === action.payload.listName ? 
											

after all this, I would go within the component itself, and 

const {state, dispatch} = useBoardContext() 

const handler = () => {
	dispatch({type: 'UPDATE_CARD', payload: {stuff needed}}
}

fasicanatinggggg


May 27, Monday 7:47AM 

clicking on the cover colors 

	- the CardModal gets the cover 
	- the Item in the board gets the cover 
	- the default setting is set to half 
	- if the setting is set to full, then labels are not shown in the item. 
	
	- if the cover is set, the size is selected, and a remove cover button appears 
	
	- also the cover button is removed from its usual spot, and its situated at the top where the cover is. 

May 27, 5:03PM 

	- Moving the button into the feature modal itself
	and handling the button toggle within, and using 
	context to perform crud operations, instead 
	of just prop drilling at 1-level. 
	i.e From parent to child, CardModal to CoverModal 
	

	

we might even be able to add an animation at 
the cover draws up or drops down, 0.5s ease, 
	- using height


20:03:33 same day 

right now, the CardModal recieves the card is a prop, 

and the CoverModal has a state for card.coverprops 

while im changing card.coverprops and updating card,

maybe bc cardModal is recieving the card as a prop, then its not recieving the immediate change that I want to see. 

So, I think I need to: 

on the CardModal,
	we need to pass in boardName and listName as props for the dispatch function
on the CardModal, we find the the card by filtering through state.boards, as its always being updated. 

This way, CardModal will 

So CardViewModal/CardModal will recieve the cardId as a prop, and use that function found in BoardContainer,

findCardById


nice!!! It works. 

In essense, 

useState for the usual things, but now instead of it being inside App, its within the component. 


May 30, 6:30AM 

for the 
list toggle 
adding a card
i think i need to add a dispatch 
for updating a list 
so that I can unshift the item so that 
it sits in the front.
because if I add use the add_card, it will add it to the end of the list 
no nvm
just modify the addCard lol right?

Maay 30, 5:PM 

for my cardmodal component, i need 

a useEffect hook that set all toggles to false on mount or unmount 

the absolute edit card, was not using the newly added top card,
and solved with useEffect 

May 31: 8AM 

Doing the labels component, almonst done i think.

Theres a problem when the component mounts.

initially when it first mounts, 

activeLabels gets populated with my custom function. 

Then the user adds/removes labels. 

The user may exit out of the cardModal and revisit it later.

When the component mounts again, the custom function will be called again, 
causing the active labels to double in size. 

so idk 


June 1, 6:07AM 

Naming conventions 

the Parent should name the 
	functions as somethingsomethingHandler 

and the child name the function 
	as the purpose itself 

i.e 

in parent: 

addListHandler = () => {....}

in child: 

<Child addList={addListHandler}>

7:12AM 
Moving List 
move list needs the current board name, all the board names, 
and the boards's list, and the current list index 

Thoughts: 

so within listActionMenu (child) - i useBoardContext's state for populating the UI.

but within BoardContainer (parent) - i useBoardContext's dispatch to define handlers for changing the state. I need to define it in the parent, as there may be side effects, and I can deal with them accordingly. 

End of Thoughts;

That being thought, I will use this thought. 

that means i need to pass in boardName into the List component 



June 3, 7PM 

might need to refactor codebase

why?

BoardContainer is defined ok, as 
the child handlers are defined here, and can 
be toggled on/off when other child appear. 

CardModal moved the state to its child, 
and while it makes the parent function lighter, 
i cant toggle the child components on/off other events are happening.

also I feel like, but im not sure, I need some of the child modals in cardModal for boardContainerabsolute, and im not sure if i designed thoes components to be specific for cardModal, or if im able to reuse them. 

todo: 
Welcome page, followed by loading page 

BoardContainer: 
Add new board 
toggle board's favorite 

header: 
filter? 
menu?

Lists:

	- ListMenu:
		- MoveList - make it work for going backwards 
		- sort by - maybe if i attach a date to the card prop. 

		- list color: hmmmm 
		- archive list & archive all cards:
			- need to have an archive data stucture that records:
				{
					boardName:
					listName:
					card: cardProp
				}
	- card itself: (1 + n)
		- make the onClick work for the whole card 
		- absolute menu - need to add all the other modals 
		-

	card modal(3):
		- move, copy, archive 



June 4, 5:55AM 

Working on new board feature + colors. 

Trello analysis:

Adding a board:



clicking on the submit button of this feature, the button background-color color becomes muted and the becomes cursor: not-allowed; 

2 seconds goes by and and all of sidebar's child components are toggled off. 
then the sidebar and header changes to the new board's color, 
specifically the sidebar gets the primary color, and the header gets a secondary color. 
then the main board, it will still be showing the old rendered board, the board's name will change to the new one, followed by the board's item will be replaced with an empty board. Then the background's color will be changed to the linear gradient. 

5:47PM 
ohhhhhh 
so we dispatch a new board with just the title, not the colors 

dispatch({type: 'add new board'})

setTimeout( () => {
	//first need to remove all child components 
	//then change the colors of header and 
}, 2000)


i need to work on the handler, then figured that out. 

basically i think the trick is to dispatch part of the board at a time .

the first dispatch will just create a new board with the title, and i think it will be created initially with the same lists as the current list before creating the new board. 

then the second dispatch the board's title will be changed 

followed by a thid dispatch of the items changing to an empty list. 

colors change 

then the new board appears by the sidebar and is active 

sh

June 5, 7:35PM 

more refactoring. with my current setup, I dont think i would be able to acheive effect 4; where the board name changes, the items changes, then the background gradient changes. 

i think the best approach would be to add more properties to context.one of them being the current board. This would simplify  all my reducer functions as i dont need to loop through the board, i can just update the current board. 

June 6, 4:38AM 
Sequence of events: 

1. the user clicks on the sidebar 

2. the user clicks on the plus button within the sidebar, which will toggle a NewBoard modal. 

3. the user fills out the input title and select a color. 

4. The user clicks on the add button. 

Effects: 

1. Upon clicking the add button, the add button css will become muted, and the cursor property becomes 'not allowed'. 
	- this is happening within the AddBoardModal, so i can have a 
	- or i add a context of 'isAddBoardHappening': boolean, 
	and within my addBoardModal, i can check if that context is true, then set the button to be muted; -- have a css property for it. 
const addBoardHandler = () => {
	dispatch(type: 'setBoardLoading': true)

}
	
	
2. 1-2 seconds goes by, and all of the sidebar's children modals that are active will be toggled off. 
const addBoardHandler = () => {
	dispatch(type: 'setBoardLoading': true)
	setTimeout( () => {
		sidebarToggleHandler() 
		dispatch( type: 'setBoadingLoading': false) 
	}, 2000)
	
	dispatch({type: 'update current board' payload: {boardName: 'name123'}) 
	await delay(50) 
	dispatch({type: 'update current board' payload: {boardItems: []}) 
	await delay(50) 
	dispatch({type: 'update current board' payload: {gradient: 'gradient'}) 
}

3. The header changes color, followed by a slighty delay and the sidebar changes color.
	dispatch({colors: primary})
	delay(20)
	dispatch({secondary})

4. The main part of the app, while still showing the old board and old title, the title will first change to the new board's title, followed by the board's list. Since its a brand new list, all of the old list will disppear from the screen leaving just one empty list. Lastly, the background gradient will fade in. 
	dispatch({type: 'update current board' payload: {boardName: 'name123'}) 
	await delay(50) 
	dispatch({type: 'update current board' payload: {boardItems: []}) 
	await delay(50) 
	dispatch({type: 'update current board' payload: {gradient: 'gradient'}) 
	
	setTime( () => {
	then two dispatch to update the global board, and another dispatch to set the current board 
	so that the sidebar gets the final touches 
	}, 50)

5. The sidebar renders out a list of boards that user can choose. After the main screen is changed, the sidebar will be updated with the new board, as well as making the new board the current active board. 


June 6, 5:30PM
add a boardId property 


thinking about dispatch in terms of single functions 

having a type of {'load_board'}, for the sidebar.

	- which actually takes the current board, and updates it within the array. 
	- then we update the currentBOard to be the selected board 
	- then we 
	
dispatch(type: load_board, payload: boardProps, boardName: string)
	- update_boards(payload)
	- updateBoard(boardName)
	colors: {
		primary: payload.colors.parimy 
		
	}
	
	
currentBoard in the BoardContainer uses optional everywhere. 


in board COntainer, for list, i need to uses something that is not listName. 
i think i need to add a listId 


7:49PM 

adding boardId and listId to board and list prop, so that i avoid the problem that a board name is duplicated or list name is duplicated. 

so i need to modify the initial state

8:35PM 
need to modify context so that it adds a boardId, when adding a newboard 

and need to modify context so that when creating a new list, it sets the index 

First question, where Am i adding a new list to the board. 

June 7, 1:00AM 
app is working, fixing the list watching feature. 


June 7, 5:25AM 

A problem: 

Toggling the boardMenu when it exists within in Parent, and the menu word /button is situated within BoardContainer.

So the naiive approach is to define the state within the parent, and pass in the state handler to BoardContainer. 

But now in BoardCOntainer, for any handler that needs the main view (all other modals are closed), i would also have to call the handler for this boardMenu.

Or we can use context.

add in a property called 
boardMenuToggle: boolean 

within BoardContainer, if the user clicks on the menu,
dispatch and change this boardMenuToggle to true.

then within in App, I use context, and check if boardMenuToggle is true, then pass in the value to the board menu. 


^^ - worked well; 

to note: we dont have to pass in a payload if the reducer doesnt need it.

i.e dispatch({type: 'yomomoms'})

June 8 - Working on the BoardMenu Feature 

June 9 - 5:44AM 

Been working on menu boardMenu,
implemented:
	- change background 
	- about 
	- activity -> maybe i can do it, idk.
	- watch 


June 10 - 4:03PM 

working on: 

notification messages for updating boardAbout 

	- passing in a type property to render different type of svgs
	- might also have different variations of colors..... 


for List:
	- sort by -> have included a date property. 
		- now just need to sort hte list and call the dispatch to update the list? 
		- and also set a notification message 

	- Move list: hmmm - feels like this is the hardest implementation. 


	- change list color: 
		- should be fun maybe. 


For Board Menu:

	- about functionality -> fixed 8:32 PM 

	- label functionality 


uh oh. a bug.
when changing list, and menu about is active, the about doesnt get the new updated changes. 
according to trello, when it changes, 
then close the menu 

in trello, if the menu is open to its default state, and the board is changed, 
then the board is changed and the menu stays open. 

if the menu is open to a different state, and the board is changed, then the menu is closed, 

the problem is how I'm udating the context of currentBoard, but the changes are not appreant to boards 

Fix: 

	- first updated reducer of update current board, to also update boards property 

	- then in the child component, use useEffect to localize the state. 



label functionality of board.

labels component should be indepdent from the boards.

it will gather all boards and find all cards that have labels that are active. 

store in the list as a set? 

return those values, limit to 5, clicking on the show more will show the rest. 


huh 

textarea with autoFocus, and onBlur={ () => setToggler(false)}

so when textarea is clicked on with autofocus, and onBlur is used when it loses focuses, 
so what im trying to say is that it seems like 


June 11: 3:32 AM

Archive and Archive Items is going to be a big feature to implement. probable a whole ass day. 

so gonna do what I had planned earlier: 


working on: 

notification messages for updating boardAbout 

	- passing in a type property to render different type of svgs
	- might also have different variations of colors..... 


for List:
	- sort by -> have included a date property. 
		- now just need to sort hte list and call the dispatch to update the list? 
		- and also set a notification message -> done () 

	- Move list: hmmm - feels like this is the hardest implementation. removed this feature. 

	- my move features are having issues.

	- change list color: have completed (:)))
		- should be fun maybe. 


The reason why my move features is buggy, is because its still using boardName, 
and not context currentBoard lol 


A couple of components in BoardContainer, that still recieves boardName as a prop, is not updated with context. 

Just fixed isWatching, which means i could remove the handler within in BoardContainer, and the ListMenu would not recieve any handlers to handle their actions, and all i do is useReducer. Very cool.

finsiehd sorting, pretty easy implementation. 

moveList, should be easy. 

archive list is next.

then its just doing all the modals 


moving the list. 
when rendering positions, i have to loop through boards using find.
but having to check when i know its not falsey. 

so refactor addBoard so that it checks to see if there are any active boards for duplicates .

the problem is setting a notifcation message, its currently tied to a child component, but i need it for the parent component and around. 

create a notification context, and it works nicely, 
can use it everywhere.

	- a trick.
in the context, i was conditionally rendering the notification props.

	- since i was conditionally rendering it with the active property set to true, then when rendered, it would just pop up at left: 2rem, instead of sliding from left: -4000px; 

	- so the solution is to pass in the booleaning as property, and rendering the notification with it, so that its active, but left: -4000px, and when booleaning is true, then its left is changed to 2rem, and the transition effect can take effect. 

for BoardAbout, 
onBlur is on the textarea, and the save button is outside of the textarea, so nothing is being changed.

onBlur rn is just toggling the state to change the textarea. I have removed it.

I could change it so that it performs a crud operation. 

June 12, 1:AM 

Gonna spend some time now to revise the UI. 

fix the sidebar, 

add thick borders on modals . 
	- to lazy now 



Started this project on May 22, 4:31:59 AM 

almost a whole month 


June 12, 3:34AM 

	- adding sidebar context toggle, makes it cool that when i click on new list, it closes the sidebar


June 12: 5:22AM 

	- a significant bug.

my context initial state, sets currentBoard to be the first value of boards. 

but if the user deletes all the boards, then it breaks. context breaks. 

So i can either stop it and keep at least 1 open. or I change the type of boardContext to be possibly undefined, 
but that would mean everywhere in my app would break. 

June 12, 10PM 

Been trying  to implement a label feature on the boardMenu,

but a problem is that I have nested the labeltype to be within a card. so if i were to create a new label, i wouldnt have anywhere to put the label.

shucks 


archived: 

can archive list and cards 

so how can i store this 
well the basis, is that on the boardMenu we can look at archive things 

so we can assume that the archive things we're looking at is based on boards 
archive = {
	boardName: {
		archiveList: 
		archiveCards: 
	}
}


archive, can restore, and delete, and view 

holy crap .

if card is archive,
and the list is archive 

and you restore the cards, it will be placed in the list that archived, and when you restore the list, the cards will be avaiable. 

hmmmm sounds complicated enough .

ok so ifyou archive the list, then it can only be restored, cant be deleted. 

i feel like i cant implement the archive feature because one of important constraint, list 'id' is indexed-based instead of a random generated number. 

And so if i remove lists from 'currentBoard', the id of every active list will be readjusted based on the size of the array

And so it's going to be hard to associate archived cards to archived lists, unless i add additional properties to the current type system to signify that the list or card is an archived item. 

