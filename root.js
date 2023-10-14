var navbar = `
<nav class="navbar navbar-expand-lg navbar-fixed-top h3 py-4">
        <div class="container">
            <a class="navbar-brand" style="font-size: larger !important;" href="/index">Naowal Rahman</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav d-flex">
                    <li class="nav-item ms-5">
                        <a class="nav-link" href="../projects">Projects</a>
                    </li>
                    <li class="nav-item dropdown ms-5">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Blog</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../math-blog/">Math</a></li>
                            <li><a class="dropdown-item" href="../cs-blog/">CS</a></li>
                            <li><a class="dropdown-item" href="../archive-blog/">Archive</a></li>
                        </ul>
                    </li>
                    <li class="nav-item ms-5">
                        <a href="#" class="nav-link">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`; 

document.body.insertAdjacentHTML("afterbegin", navbar);