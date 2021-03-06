use crate::{SerdeDiff, serialization::SerializationStrategy};
use crate::error::ErrorKind;

/// Applies modified values to a type.
pub struct Apply;

impl Apply {
    /// Applies modified values to a type.
    ///
    /// * `type`: the type to which you want to apply the modified values.
    /// * `data`: the buffer with the modified type values.
    /// * `strategy`: the strategy used to deserialize the given `data` into the given `type`.
    pub fn apply_to<
        C: SerdeDiff,
        S: SerializationStrategy,
    >(
        component: &mut C,
        data: &[u8],
        strategy: S,
    ) -> Result<(), ErrorKind> {
        strategy.apply_to(component, data)
    }
}
