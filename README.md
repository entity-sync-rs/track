[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z8QK6XU749JB2) 
[![Latest Version][crate-badge]][crate-link] 
[![docs][docs-badge]][docs-link]
![Lines of Code][loc-badge]
[![MIT][license-badge]][license-link] 

# Track Data Modifications
This library offers a boilerplate free approach to track struct data modifications. 
For optimization, only the adjusted fields are tracked and will be serialized and sent on an channel.

## Features

- [X] Monitoring modifications in data
- [X] Serde based (excluding fields, ...)
- [X] Applying modifications to a type
- [x] Customizable Serialization

# Examples

First, add `track` attribute to mark type as trackable.
```rust
// imports all necessarily types for the `track` attribute.
use track::preclude::*;

#[track]
#[derive(Debug)]
pub struct Position {
    pub x: u32,
    pub y: u32,
}
```

Now let us make some modifications and apply those to other instances.
```rust
use track::{preclude::*, serialisation::bincode::Bincode, Apply, ModificationChannel};

fn main() {
    let channel = ModificationChannel::new();

    let updated_storage = vec![
        (Uuid::new_v4(), Position { x: 0, y: 0 }),
        (Uuid::new_v4(), Position { x: 0, y: 0 }),
    ];
    let mut outdated_storage = updated_storage.clone();

    make_changes(&channel, updated_storage);

    apply_changes(&channel, &mut outdated_storage);
}

fn make_changes(channel: &ModificationChannel, entities: Vec<(Uuid, Position)>) {
    for (uuid, mut position) in entities {
        // Returns `Tracker` which monitors for changes.
        let mut position = position.track_by(channel.sender(), uuid); 

        // `Tracker` implements `DerefMut`
        position.x += 1;
        position.y += 1;
    } // <- on the `Drop` of `wrapper` changes are serialized and sent on the channel.
}

fn apply_changes(channel: &ModificationChannel, entities: &mut Vec<(Uuid, Position)>) {
    for event in channel.receiver().try_iter() {
        let entity = entities
            .iter_mut()
            .find(|e| e.0 == event.identifier.unwrap())
            .unwrap();

        Apply::apply_to(&mut entity.1, &event.modified_fields, Bincode);

        println!("entity updated {:?}", entity);
    }
}
```

[crate-badge]: https://img.shields.io/crates/v/track.svg
[crate-link]: https://crates.io/crates/track

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license-link]: ./docs/LICENSE

[docs-badge]: https://docs.rs/track/badge.svg
[docs-link]: https://docs.rs/track/

[loc-badge]: https://tokei.rs/b1/github/entity-sync-rs?category=code