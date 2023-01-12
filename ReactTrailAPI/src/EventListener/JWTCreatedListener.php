<?php

namespace App\EventListener;

use App\Repository\UtilisateurRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    private UtilisateurRepository $utilisateurRepository;

    /**
     * @param UtilisateurRepository $utilisateurRepository
     */
    public function __construct(RequestStack $requestStack, UtilisateurRepository $utilisateurRepository)
    {
        $this->requestStack = $requestStack;
        $this->utilisateurRepository = $utilisateurRepository;
    }

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $payload       = $event->getData();
        $payload['email'] = $payload['username'];
        $user = $this->utilisateurRepository->findOneBy(["email" => $event->getUser()->getUserIdentifier()]);
        $payload['pseudo'] = $user->getPseudo();
        $payload['id'] = $user->getId();

        $event->setData($payload);
    }
}