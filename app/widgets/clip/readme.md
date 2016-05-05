Playlist struct

```
Map{
    items: List<TrackItems>
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
    id: string,
    duration: number,
    images: List<string>,
    markers: List<Marker>,
    regions: List<Region>,
    fadeIn: Region,
    fadeOut: Region,
}
```

Region struct

```
Map{
    id: string,
    key: string,
    position: number,
    duration: number,
}
```

Marker struct 

```
Map{
    id: string,
    key: string,
    position: number,
}
```
