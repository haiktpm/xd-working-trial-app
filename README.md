# Note


# 

```
create table public.user_access (
    user_id     serial NOT NULL,
    user_info   varchar(240),
    created_at        timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);
```