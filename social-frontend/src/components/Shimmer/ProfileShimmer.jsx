import { Card, CardHeader, ImageList, ImageListItem, Skeleton, useMediaQuery } from '@mui/material'
import React from 'react'

const ProfileShimmer = () => {

    const xs = useMediaQuery('(max-width:600px)');
    const sm = useMediaQuery('(max-width:900px)');
    const md = useMediaQuery('(min-width:900px)');
    return (
        <Card sx={{  maxWidth: {xs: "100%", sm: "80%" }, margin: "0 auto", p:2 , background: "none", boxShadow: "none"  }}>
            <CardHeader
                avatar={
                    (
                        <Skeleton animation="wave" variant="circular" width={150} height={150} sx={{marginBottom:"20px"}} />
                    )
                }

                title={

                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />

                }
                subheader={

                    <Skeleton animation="wave" height={10} width="40%" />

                }
            />

            <ImageList rowHeight={xs ? 120 : sm ? 164 : md ? 250 : 300} gap={xs ? 10 : md ? 15 : 10} cols={3} >
                <ImageListItem key={1} >
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

                <ImageListItem key={2} >
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

                <ImageListItem key={3}>
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

                <ImageListItem key={4} >
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

                <ImageListItem key={5} >
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

                <ImageListItem key={6} >
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </ImageListItem>

            </ImageList>


            {/* <CardContent>

                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>

            </CardContent> */}
        </Card>
    )
}

export default ProfileShimmer
