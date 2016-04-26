Playlist struct

```
Map{
    items: List[
        ...TrackItems
    ]
}
```

TrackItem struct

```
Map{
    id: any,
    position: number,
    offsetStart: number,
    offsetLength: number,
    maxOffsetLength: number,
    fadeIn: number,
    fadeOut: number,
    track: number,
    clip: Clip
}
```

Clip struct

```
Map{
    id,
    duration,
    images,
    markers,
    regions,
    fadeIn,
    fadeOut,
}
```
