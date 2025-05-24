import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = "edge"

async function loadGoogleFont(font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
        const response = await fetch(resource[1])
        if (response.status == 200) {
            return await response.arrayBuffer()
        }
    }

    throw new Error('failed to load font data')
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ nama: string, pasangan: string }> }) {
    const searchParams = request.nextUrl.searchParams;
    const namaAnda = (await params).nama;
    const namaPasangan = (await params).pasangan;
    const bgDesign = (parseInt(searchParams.get('bg') ?? '1', 10)) - 1;
    const fontDesign = (parseInt(searchParams.get('font') ?? '1', 10)) - 1;

    // Define bg designs and suitable foreground colors
    const bgDesigns = [
        {
            // Vercel's Gradient (OG Playground)
            backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
            color: 'black',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853750/metatags/TawinOG/1_tj2zqy.png')",
            color: '#ef7271',

        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853752/metatags/TawinOG/2_lv8jpq.png')",
            color: '#af8c39',

        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853750/metatags/TawinOG/3_xbothm.png')",
            color: '#c5a44f',

        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853750/metatags/TawinOG/4_krn3og.png')",
            color: '#2e2826',
            dropShadow: true,

        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853750/metatags/TawinOG/5_dvpd1r.png')",
            color: '#e61f93',
        },
        {
            backgroundImage: "url('https://res.cloudinary.com/iqfareez-cloud/image/upload/v1737853751/metatags/TawinOG/6_mif0w6.png')",
            color: '#804600',
        }
    ]

    const fontDesigns = [
        {
            fontFamily: 'Great Vibes',
        },
        {
            fontFamily: 'Birthstone',
        }
    ]

    const text = `${namaAnda} & ${namaPasangan}`;

    return new ImageResponse(

        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 180,
                    color: bgDesigns[bgDesign].color,
                    backgroundImage: bgDesigns[bgDesign].backgroundImage,
                    width: '100%',
                    height: '100%',
                    padding: '50px 200px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ fontFamily: fontDesigns[fontDesign].fontFamily, fontSize: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: .9 }}>
                    <div>{namaAnda}</div>
                    <div>&</div>
                    <div>{namaPasangan}</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Birthstone',
                    data: await loadGoogleFont('Birthstone', text),
                    style: 'normal',
                },
                {
                    name: 'Great Vibes',
                    data: await loadGoogleFont('Great Vibes', text),
                    style: 'normal',
                },
            ]
        },
    );
}