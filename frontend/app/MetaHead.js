import Head from "next/head";

//Default Head to provide page metadata

export function MetaHead(props) {
    const { title, isMobile } = props;

    const csrfToken = "";

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />

                <title>{title ? `${title} | JASMA` : "JASMA"}</title>

                <meta
                    name="description"
                    content="JASMA - Just Another Social Media App"
                />
                <meta
                    name="viewport"
                    content={isMobile ? "width=device-width, initial-scale=1" : "width=1200"}
                />
                <meta
                    name="theme-color"
                    content="#000000"
                />
                <meta
                    name="author"
                    content="Steph Koopmanschap and others"
                />
                <meta
                    name="csrf-token"
                    content={csrfToken}
                ></meta>

                <meta
                    property="og:title"
                    content="Just Another Social Media App"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:url"
                    content="https://jasma.vercel.app"
                />
                <meta
                    property="og:description"
                    content="Just Another Social Media App"
                />
                <meta
                    property="og:image"
                    content="image.png"
                />

                <link
                    rel="icon"
                    href="/favicon.ico"
                />
                <link
                    rel="icon"
                    href="/favicon.svg"
                    type="image/svg+xml"
                ></link>
                <link
                    rel="apple-touch-icon"
                    href="/logo192.png"
                />

                {/* <!--
                manifest.json provides metadata used when your web app is installed on a
                user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
            --> */}
                <link
                    rel="manifest"
                    href="/manifest.json"
                />
            </Head>
        </div>
    );
}
