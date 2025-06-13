
export default function Layout(props) {
    const { children } = props;
    return (
        <>
            <header>
                <h1 className="text-gradient">
                    LURY Build you Vocab
                </h1>
            </header> 
            
            <main>
                {children}
            </main> 
            <footer>
                <small>Created by</small>
                <a href="https://github.com/rohitxess?tab=repositories" target="_blank">
                    <img src="https://avatars.githubusercontent.com/u/34299640?s=400&u=edd9df0e598932c317e3faf477570eafbb779422&v=4" alt="" />
                    <p>rohitxess</p>
                    <i class="fa-brands fa-github"></i>
                </a>
            </footer> 
        </>
    )
}