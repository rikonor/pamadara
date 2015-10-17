Instructions
------------

A pamadara can generate multiple timers.

When a timer is created it will have an associated ID.

Timers have the following phases:
1. Work - default is 25 minutes
2. Rest - default is 5 mimnutes

When a timer ends it will:
1. Call a provided callback (if given)
2. Emit an event with relevant information, along with its ID
3. Cycle to the next phase (Work <=> Rest)
