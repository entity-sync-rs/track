initSidebarItems({"derive":[["SerdeDiff","Examples"]],"enum":[["FieldPathMode","Configures how to serialize field identifiers"]],"macro":[["opaque_serde_diff","Implements SerdeDiff on a type given that it impls Serialize + Deserialize + PartialEq. This makes the type a \"terminal\" type in the SerdeDiff hierarchy, meaning deeper inspection will not be possible. Use the SerdeDiff derive macro for recursive field inspection."]],"struct":[["Apply","A deserializable structure that will apply a sequence of diff commands to the target"],["Config","Configures creation of `Apply` and `Diff`"],["Diff","A serializable structure that will produce a sequence of diff commands when serialized. You can pass this to a serializer, or use the convenience method `diff` to pass your serializer along with old/new values to use when serializing the diff."]],"trait":[["SerdeDiff","Anything diffable implements this trait"]]});