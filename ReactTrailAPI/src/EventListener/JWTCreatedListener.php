<?php

namespace App\EventListener;

use App\Repository\UtilisateurRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    private UtilisateurRepository $utilisateurRepository;

    /**
     * @param UtilisateurRepository $utilisateurRepository
     */
    public function __construct(UtilisateurRepository $utilisateurRepository)
    {
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
        unset($payload['username']);
        $user = $this->utilisateurRepository->findOneBy(["email" => $event->getUser()->getUserIdentifier()]);
        $payload['pseudo'] = $user->getPseudo();

        $event->setData($payload);
    }
}