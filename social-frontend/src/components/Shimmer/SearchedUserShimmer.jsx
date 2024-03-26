import { CardHeader, Skeleton } from "@mui/material"
import React from "react"

const SearchedUserShimmer = () => {
    return (
        <CardHeader sx={{width:"100%"}}
            avatar={
                (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                )
            }
            title={
                (
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                )
            }
            subheader={
                (
                    <Skeleton animation="wave" height={10} width="40%" />
                )
            }
        />

    )
}

export default SearchedUserShimmer